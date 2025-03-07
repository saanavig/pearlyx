import './index.css';

import React, { useState } from 'react';

import { ReactMic } from 'react-mic';

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAudioFile(event.target.files[0]);
    }
  };

  const toggleRecording = () => {
    setRecording((prev) => !prev);
  };

  const onStop = (recordedBlob: { blob: Blob }) => {
    setRecordedBlob(recordedBlob.blob);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-teal-700 text-white py-4 px-6 shadow-md navbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold ml-4">Pearlyx</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-[80vh] space-y-6">
        <h2 className="text-3xl font-semibold text-gray-100">Upload or Record Audio</h2>

        {/* File Upload */}
        <div className="flex flex-col items-center space-y-2">
          <input type="file" accept="audio/*" onChange={handleFileChange} className="p-2 border rounded-md bg-gray-700 text-white" />
          {audioFile && <p className="text-gray-300">Uploaded: {audioFile.name}</p>}
        </div>

        {/* Audio Recorder */}
        <div className="flex flex-col items-center space-y-2">
          <ReactMic
            record={recording}
            className="border rounded-md w-64"
            onStop={onStop}
            strokeColor="#4A90E2"
            backgroundColor="#2e2e2e"
          />
          <button
            onClick={toggleRecording}
            className={`px-4 py-2 rounded-md text-white ${recording ? "bg-red-600" : "bg-green-600"}`}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          {recordedBlob && <audio controls src={URL.createObjectURL(recordedBlob)} />}
        </div>
      </main>
    </div>
  );
};

export default App;
