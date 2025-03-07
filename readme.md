# Pearlyx

**Pearlyx** is a web app that analyzes voice recordings to detect early signs of diseases like Parkinson’s, Alzheimer’s, and other respiratory conditions such as COVID-19 and pneumonia. Using advanced AI models, the app listens to voice patterns and identifies potential health issues based on speech anomalies like slurred speech or cough analysis.

### Key Features
- ✅ **Speech-based AI Diagnosis**: Users can either record a voice sample or upload an audio file, and the AI detects early disease patterns such as slurred speech or tremors in Parkinson’s.
- ✅ **Symptom Progression Tracking**: Users can track the progression of their symptoms over time, with historical voice trends to monitor their health.
- ✅ **Privacy-First Approach**: The AI models run on-device to protect user data and maintain privacy at all stages.

### Potential Improvements
- Detecting other diseases such as **Alzheimer’s** and respiratory conditions like **COVID-19** or **pneumonia** using **cough analysis** with AI models.

---

## Tech Stack

### Speech Analysis
- **Wav2Vec**: Utilized for converting voice recordings into text by processing raw audio data.

### Machine Learning Models
- **TensorFlow**: Machine learning frameworks used to train AI models on disease-specific datasets like **mPower** (Parkinson's dataset).

### Audio Processing
- **Librosa**: A powerful library for signal processing and feature extraction from audio recordings.

### Frontend
- **React.js**: Frontend framework for building a responsive web app.
- **Tailwind CSS**: Utility-first CSS framework used for designing the UI.

### Backend
- **Flask**: Backend frameworks used to handle API requests and serve the AI model for voice analysis.

---

## How It Works

1. **Record or Upload an Audio Sample**: Users can either record their voice directly through the web app or upload an existing audio file.
2. **Speech-to-Text Conversion**: The app uses **Wav2Vec** to convert the voice into text and extract relevant speech features.
3. **AI Analysis**: The extracted features are passed to a **TensorFlow** model that identifies speech patterns indicative of diseases like Parkinson’s.
4. **Symptom Tracking**: Users can track their voice trends and symptom progression over time through graphical reports.
5. **Privacy Protection**: All data processing and AI analysis are performed on the device, ensuring that no private data is transmitted to external servers.

---

## Example Workflow

1. **User Records or Uploads Audio**: The user can either record a voice sample directly in the web app or upload an existing audio file.
2. **AI Diagnoses the Voice**: The recorded or uploaded audio is sent to the Flask/FastAPI backend, where the AI model processes it to detect patterns.
3. **Results Displayed**: The frontend will display a diagnosis, whether it's a positive indication of early Parkinson’s signs or any other condition the app is trained to detect.

---

## Privacy and Security

- All AI processing occurs **on-device** to ensure user data is kept private.
- **No voice recordings** or sensitive data are stored or transmitted to external servers.
- Users are in full control of their health data at all times.

---

## Potential Use Cases

- **Parkinson’s Disease Detection**: Early detection of Parkinson’s through speech anomalies (e.g., tremors, slurred speech).
- **Alzheimer’s Disease Detection**: Detect speech-related patterns that may indicate early signs of Alzheimer’s.
- **Respiratory Conditions**: Analyze coughs to detect potential signs of **COVID-19** or **pneumonia**.

---

## Future Improvements

- **Enhance ML Models**: Train models for a wider range of diseases beyond Parkinson's.
- **Real-time Tracking**: Allow users to record multiple samples over time and provide real-time progress tracking.
- **Expand Data Privacy**: Further improve data privacy by adding encrypted local storage solutions.
- **Cross-Platform Support**: Expand the mobile app version to Android and iOS.

---

## Contributors
- **Contributor 1**: [Saanavi Goyal](https://github.com/saanavig/)
- **Contributor 2**: [Addina Rahaman](https://github.com/addinar)
- **Contributor 3**: [Srewashi Mondal](https://github.com/srewashimondal)
- **Contributor 4**: [Cindy Zheng](https://github.com/zcindy22)

