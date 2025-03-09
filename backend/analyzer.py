import pickle
import os
import parselmouth
import numpy as np
from parselmouth.praat import call

class Analyzer:
    def __init__(self, file):
        self.file = file
        self.load_file()

    def load_file(self):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(script_dir, 'models/model.pkl')
        scaler_path = os.path.join(script_dir, 'models/scaler.pkl')

        print(f"Loading model from: {model_path}")

        with open(model_path, 'rb') as f:
            model = pickle.load(f)

        print(f"Model loaded: {type(model)}")
        try:
            with open(scaler_path, 'rb') as f:
                scaler = pickle.load(f)
            self.scaler = scaler
            print(f"Scaler loaded: {type(scaler)}")
        except FileNotFoundError:
            print("No scaler file found")
            self.scaler = None

        self.model = model

    def predict(self, params, threshold=0.52):
        if hasattr(self, 'scaler') and self.scaler is not None:
            params = self.scaler.transform(params)

        prob = float(self.model.predict_proba(params)[:, 1][0])
        prediction = 1 if prob > threshold else 0

        # Calculate additional metrics
        voice_quality_score = min(100, max(0, (1 - abs(prob - 0.52)) * 100))
        reliability_score = min(100, max(0, (1 - abs(prob - threshold)) * 100))
        severity_level = "High" if prob > 0.75 else "Moderate" if prob > 0.6 else "Low"

        # Determine confidence level
        if abs(prob - 0.52) < 0.1:
            confidence = "Medium"
        elif prob > 0.7:
            confidence = "High"
        else:
            confidence = "Low"

        print(f"Probability: {prob}, Prediction: {prediction}, Confidence: {confidence}")

        return {
            'prediction': prediction,
            'probability': prob,
            'confidence': confidence,
            'diagnosis': 'Parkinson\'s detected' if prediction == 1 else 'No Parkinson\'s detected',
            'voice_quality': round(voice_quality_score, 2),
            'reliability': round(reliability_score, 2),
            'severity': severity_level,
            'analysis_metrics': {
                'voice_tremor': round(params[0][4] * 100, 2),  # Using jitter as tremor indicator
                'voice_stability': round((1 - params[0][9]) * 100, 2),  # Using shimmer for stability
                'breath_support': round(params[0][16] * 100, 2)  # Using harmonicity for breath support
            }
        }

    # more functions for creating measurements
    def get_features(self, audio_file):
        features = []
        sound = parselmouth.Sound(audio_file)
        pitch = call(sound, "To Pitch", 0.0, 60, 500)
        pulses = call([sound, pitch], "To PointProcess (cc)")
        num_points = call(pulses, "Get number of points")
        points = [call(pulses, "Get time from index", i+1) for i in range(num_points)]
        periods = np.diff(points)

        numPulses = call(pulses, "Get number of points")
        features.append(numPulses)

        numPeriodsPulses = len(periods)
        features.append(numPeriodsPulses)

        meanPeriodPulses = np.mean(periods)
        features.append(meanPeriodPulses)

        stdDevPeriodPulses = np.std(periods)
        features.append(stdDevPeriodPulses)

        locPctJitter = call(pulses, "Get jitter (local)", 0.0, 0.0, 0.0001, 0.02, 1.3)
        features.append(locPctJitter)

        locAbsJitter = call(pulses, "Get jitter (local, absolute)", 0.0, 0.0, 0.0001, 0.02, 1.3)
        features.append(locAbsJitter)

        rapJitter = call(pulses, "Get jitter (rap)", 0.0, 0.0, 0.0001, 0.02, 1.3)
        features.append(rapJitter)

        ppq5Jitter = call(pulses, "Get jitter (ppq5)", 0.0, 0.0, 0.0001, 0.02, 1.3)
        features.append(ppq5Jitter)

        ddpJitter = call(pulses, "Get jitter (ddp)", 0.0, 0.0, 0.0001, 0.02, 1.3)
        features.append(ddpJitter)

        locShimmer = call([sound, pulses], "Get shimmer (local)", 0.0, 0.0, 0.0001, 0.02, 1.3, 1.6)
        features.append(locShimmer)

        locDbShimmer = call([sound, pulses], "Get shimmer (local_dB)", 0.0, 0.0, 0.0001, 0.02, 1.3, 1.6)
        features.append(locDbShimmer)

        apq3Shimmer = call([sound, pulses], "Get shimmer (apq3)", 0.0, 0.0, 0.0001, 0.02, 1.3, 1.6)
        features.append(apq3Shimmer)

        apq5Shimmer = call([sound, pulses], "Get shimmer (apq5)", 0.0, 0.0, 0.0001, 0.02, 1.3, 1.6)
        features.append(apq5Shimmer)

        apq11Shimmer = call([sound, pulses], "Get shimmer (apq11)", 0.0, 0.0, 0.0001, 0.02, 1.3, 1.6)
        features.append(apq11Shimmer)

        ddaShimmer = call([sound, pulses], "Get shimmer (dda)", 0.0, 0.0, 0.0001, 0.02, 1.3, 1.6)
        features.append(ddaShimmer)

        harmonicity = call(sound, "To Harmonicity (cc)", 0.01, 75, 0.1, 1.0)
        meanAutoCorrHarmonicity = call(harmonicity, "Get mean", 0, 0)
        features.append(meanAutoCorrHarmonicity)

        meanNoiseToHarmHarmonicity = 1 / (10 ** (meanAutoCorrHarmonicity / 10))
        features.append(meanNoiseToHarmHarmonicity)

        meanHarmToNoiseHarmonicity = 10 ** (meanAutoCorrHarmonicity / 10)
        features.append(meanHarmToNoiseHarmonicity)

        intensity = call(sound, "To Intensity", 75, 0.0)
        minIntensity = call(intensity, "Get minimum", 0, 0, "Parabolic")
        features.append(minIntensity)

        maxIntensity = call(intensity, "Get maximum", 0, 0, "Parabolic")
        features.append(maxIntensity)

        meanIntensity = call(intensity, "Get mean", 0, 0, "energy")
        features.append(meanIntensity)

        formant = call(sound, "To Formant (burg)", 0.0, 5, 5500, 0.025, 50)
        f1 = call(formant, "Get mean", 1, 0, 0, "Hertz")
        features.append(f1)

        f2 = call(formant, "Get mean", 2, 0, 0, "Hertz")
        features.append(f2)

        f3 = call(formant, "Get mean", 3, 0, 0, "Hertz")
        features.append(f3)

        f4 = call(formant, "Get mean", 4, 0, 0, "Hertz")
        features.append(f4)

        b1 = call(formant, "Get bandwidth at time", 1, 0.5, "Hertz", "Linear")
        features.append(b1)

        b2 = call(formant, "Get bandwidth at time", 2, 0.5, "Hertz", "Linear")
        features.append(b2)

        b3 = call(formant, "Get bandwidth at time", 3, 0.5, "Hertz", "Linear")
        features.append(b3)

        b4 = call(formant, "Get bandwidth at time", 4, 0.5, "Hertz", "Linear")
        features.append(b4)

        return np.array(features).reshape(1, -1)