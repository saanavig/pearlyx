import { useLocation, useNavigate } from "react-router-dom";

import React from "react";

const Analyze: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { filepath, filename } = location.state || {};

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
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800">Analysis Results</h1>
            <div className="mt-4 text-gray-600">
                <p>File name: <strong>{filename}</strong></p>
            </div>
            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
                Upload Another File
            </button>
        </div>
    );
};

export default Analyze;