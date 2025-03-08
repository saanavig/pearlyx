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
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        self.model = model

    def predict(self, params): # params is a 2D numpy array
        return self.model.predict(params)

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
        features.append(meanNoiseToHarmHarmonicity)

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