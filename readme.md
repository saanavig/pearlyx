# Pearlyx - Voice Analysis Tools for Neurological & Respiratory Health

Pearlyx is an innovative web application designed to assist in the early detection of Parkinson's disease through voice analysis. Using advanced AI technology, we analyze subtle variations in voice patterns to provide preliminary screening support for healthcare professionals.

## Features

- **Voice Recording & Analysis**: Upload or record voice samples for instant analysis
- **AI-Powered Detection**: Advanced analysis of voice patterns, tremors, and breathing patterns
- **Interactive Chat Support**: AI-assisted information about Parkinson's disease
- **Detailed Reports**: Comprehensive analysis results with multiple metrics
- **Healthcare Integration**: Support tool for medical professionals

## Technology Stack

- **Frontend**:
  - React + TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - React Router for navigation

- **Backend**:
  - Python Flask server
  - Gemini AI for chat support
  - pydub for audio processing
  - Custom ML model for voice analysis

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- FFmpeg for audio processing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pearlyx.git
cd pearlyx
```

2. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

3. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
```

4. Configure environment variables:
```bash
# In backend/.env
GEMINI_API_KEY=your_api_key_here
```

5. Start the backend server:
```bash
python app.py
```

## Important Note

Pearlyx is designed as a screening tool and should not be used as a definitive diagnostic solution. Our technology aims to support, not replace, professional medical diagnosis. Always consult with healthcare professionals for proper medical evaluation and diagnosis.

## Statistics

- Parkinson's affects nearly 1 million people in the US alone
- 90% of Parkinson's patients experience voice changes
- Voice changes can appear before motor symptoms become apparent

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.


## Future Improvements

- **Enhance ML Models**:  Train models to detect a broader range of diseases beyond Parkinson’s, including Alzheimer's and respiratory illnesses such as pneumonia and COVID-19.
- **Real-time Tracking**: Allow users to record multiple samples over time and provide real-time progress tracking.
- **Expand Data Privacy**: Further improve data privacy by adding encrypted local storage solutions.
- **Cross-Platform Support**: Expand the mobile app version to Android and iOS.

---

## Contributors
- **Contributor 1**: [Saanavi Goyal](https://github.com/saanavig/)
- **Contributor 2**: [Addina Rahaman](https://github.com/addinar)
- **Contributor 3**: [Srewashi Mondal](https://github.com/srewashimondal)
- **Contributor 4**: [Cindy Zheng](https://github.com/zcindy22)

