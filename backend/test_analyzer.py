import os
from analyzer import Analyzer
import wave
import numpy as np

def test_analyzer():
    # Create a test WAV file
    def create_test_wav(filename, duration=1.0, sample_rate=44100):
        # Generate a simple sine wave
        t = np.linspace(0, duration, int(sample_rate * duration))
        audio_data = np.sin(2 * np.pi * 440 * t)  # 440 Hz sine wave
        audio_data = (audio_data * 32767).astype(np.int16)
        
        with wave.open(filename, 'wb') as wav_file:
            wav_file.setnchannels(1)  # Mono
            wav_file.setsampwidth(2)  # 2 bytes per sample
            wav_file.setframerate(sample_rate)
            wav_file.writeframes(audio_data.tobytes())
        
        return filename

    try:
        # Create test directories if they don't exist
        os.makedirs("uploads", exist_ok=True)
        os.makedirs("models", exist_ok=True)

        # Create a test audio file
        test_file = "uploads/test_audio.wav"
        create_test_wav(test_file)
        
        # Initialize analyzer
        analyzer = Analyzer(file="models/model.pkl")
        
        # Test feature extraction
        print("\nTesting feature extraction...")
        features = analyzer.get_features(test_file)
        print(f"Features extracted: {len(features[0])} features")
        
        # Test prediction
        print("\nTesting prediction...")
        prediction = analyzer.predict(features)
        print("Prediction result:", prediction)
        
        # Test with different thresholds
        thresholds = [0.3, 0.5, 0.7]
        print("\nTesting different thresholds...")
        for threshold in thresholds:
            pred = analyzer.predict(features, threshold=threshold)
            print(f"\nThreshold {threshold}:")
            print(f"Prediction: {pred['prediction']}")
            print(f"Diagnosis: {pred['diagnosis']}")
        
        print("\nAll tests completed successfully!")
        
    except Exception as e:
        print(f"Error during testing: {str(e)}")
    finally:
        # Cleanup
        if os.path.exists(test_file):
            os.remove(test_file)

def test_real_audio():
    try:
        # Path to your actual audio file
        test_file = "uploads/AH_197T_7552379A-2310-46E1-9466-9D8045C990B8.wav"
        # test_file = "/Users/saanavigoyal/Desktop/Learn/pearlyx/backend/uploads/test2.wav"
        if not os.path.exists(test_file):
            print(f"Error: File not found at {test_file}")
            return
            
        print(f"\nTesting with real audio file: {os.path.basename(test_file)}")
        
        # Initialize analyzer
        analyzer = Analyzer(file="models/model.pkl")
        
        # Test feature extraction
        print("\nExtracting features...")
        features = analyzer.get_features(test_file)
        print(f"Features extracted: {len(features[0])} features")
        print("Feature values:", features[0])
        
        # Test prediction with different thresholds
        thresholds = [0.3, 0.5, 0.55, 0.6, 0.7]
        print("\nTesting predictions with different thresholds:")
        
        for threshold in thresholds:
            pred = analyzer.predict(features, threshold=threshold)
            print(f"\nThreshold {threshold}:")
            print(f"Prediction: {pred['prediction']}")
            print(f"Probability: {pred.get('probability', 'N/A')}")
            print(f"Confidence: {pred.get('confidence', 'N/A')}%")
            print(f"Risk Level: {pred.get('risk_level', 'N/A')}")
            print(f"Diagnosis: {pred['diagnosis']}")
        
        print("\nTest completed successfully!")
        
    except Exception as e:
        print(f"Error during testing: {str(e)}")
        import traceback
        print(traceback.format_exc())

if __name__ == "__main__":
    test_analyzer()
    test_real_audio()