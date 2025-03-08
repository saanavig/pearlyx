import { useLocation, useNavigate } from "react-router-dom";

import React from "react";

const Analyze: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileUrl = location.state?.fileUrl || "No file uploaded.";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800">Analysis Results</h1>
        <p className="mt-4 text-gray-600">Your uploaded file: <strong>{fileUrl}</strong></p>
        <button onClick={() => navigate("/")} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg">
            Upload Another File
        </button>
        </div>
    );
};

export default Analyze;
