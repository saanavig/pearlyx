import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import logo from './assets/logo.png';

const Analyze: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filepath, filename } = location.state || {};
  interface PredictionResult {
    diagnosis: string;
    prediction: number;
    probability: number;
    confidence: string;
    details: string;
    classification?: string;
    voice_quality?: number;
    reliability?: number;
    analysis_metrics?: {
      voice_tremor: number;
      voice_stability: number;
      breath_support: number;
    };
    severity?: string;
  }

  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPrediction = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:5000/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: filename,
            needs_classification: true
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Raw API response:", data); // Debug full response
          
          // Check the structure of the prediction data
          if (data.prediction) {
            console.log("Prediction details:", {
              prediction: data.prediction.prediction,
              diagnosis: data.prediction.diagnosis,
              classification: data.prediction.classification
            });
            setPredictionResult(data.prediction);
          } else {
            console.error("Unexpected prediction format:", data);
            setError("Invalid prediction format received");
          }
        } else {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          setError(`Failed to get prediction: ${errorData.error}`);
        }
      } catch (err) {
        console.error("Analysis error details:", err);
        setError("Error analyzing file");
      } finally {
        setIsLoading(false);
      }
    };

    if (filename) {
      getPrediction();
    }
  }, [filename]);

  if (!filepath || !filename) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800">No File Found</h1>
        <p className="mt-4 text-gray-600">Please upload a file first.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <div className="text-xl font-semibold flex items-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img
              src={logo}
              alt="Pearlyx Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="ml-2 text-gray-900">Pearlyx</span>
        </div>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-gray-900">Chat</Link>
          <Link to="/about" className="text-blue-600 font-medium">
            About
          </Link>
        </div>
      </nav>

      <div className="container mx-auto text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mt-10">Analysis Results</h1>
        <div className="mt-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">File: <strong>{filename}</strong></p>
          {isLoading ? (
            <p className="text-blue-600">Analyzing audio file...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : predictionResult && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">Prediction Results</h2>
              <div className="text-blue-800 space-y-2">
                <p>Diagnosis: <strong>{predictionResult.diagnosis}</strong></p>
                <p>Confidence: <strong>{predictionResult.confidence}</strong></p>
                <p>Probability: <strong>{(predictionResult.probability * 100).toFixed(2)}%</strong></p>

                {/* Add more metrics */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Voice Quality Score</h3>
                    <p className="text-2xl font-bold text-blue-600">{predictionResult.voice_quality}%</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Reliability Score</h3>
                    <p className="text-2xl font-bold text-blue-600">{predictionResult.reliability}%</p>
                  </div>
                </div>

                <div className="mt-4 bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Detailed Analysis</h3>
                  <div className="space-y-2">
                    {predictionResult.analysis_metrics && (
                      <>
                        <p>Voice Tremor: <strong>{predictionResult.analysis_metrics.voice_tremor}%</strong></p>
                        <p>Voice Stability: <strong>{predictionResult.analysis_metrics.voice_stability}%</strong></p>
                        <p>Breath Support: <strong>{predictionResult.analysis_metrics.voice_tremor}%</strong></p>
                      </>
                    )}
                    <p>Severity Level: <strong>{predictionResult.severity}</strong></p>
                  </div>
                </div>
              </div>
              {predictionResult.prediction === 1 && predictionResult.classification && (
                <div className="mt-4 p-3 bg-white rounded">
                  <h3 className="font-semibold text-blue-900">Additional Information:</h3>
                  <p className="text-blue-800">{predictionResult.classification}</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upload Another File
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
