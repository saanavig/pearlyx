import React from "react";
import { useLocation } from "react-router-dom";

const Results: React.FC = () => {
    const location = useLocation();
    const { filename } = location.state || {};

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800">Analysis Results</h1>
            {filename ? (
                <p className="mt-4 text-lg text-gray-600">Processing results for: <b>{filename}</b></p>
            ) : (
                <p className="mt-4 text-lg text-red-500">No file uploaded.</p>
            )}
        </div>
    );
};

export default Results;
