import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Analyze: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filepath, filename, prediction } = location.state || {};
  const [randomPrediction, setRandomPrediction] = useState<number | null>(null);

  useEffect(() => {
    //placeholder - change need to be replaced with data
    setRandomPrediction(Math.round(Math.random()));
  }, []);

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
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="ml-2 text-gray-900">Pearlyx</span>
        </div>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="text-blue-600 font-medium">
            About
          </Link>
        </div>
      </nav>

      <div className="container mx-auto text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mt-10">Analysis Results</h1>
        <div className="mt-4 text-gray-600">
          <p>File name: <strong>{filename}</strong></p>
          <p>Prediction: <strong>{randomPrediction}</strong></p>
          <p>Diagnosis: <strong>
            {randomPrediction === 1 ? "Parkinson's detected" : "No Parkinson's detected"}
          </strong></p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Upload Another File
        </button>
      </div>
    </div>
  );
};

export default Analyze;