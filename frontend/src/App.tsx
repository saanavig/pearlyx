import "./index.css";

import React, { useState } from "react";

import { ReactMic } from "react-mic";

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

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

  const uploadFile = async () => {
      let fileToUpload = audioFile;

      if (recordedBlob) {
        fileToUpload = new File([recordedBlob], "recorded-audio.wav", { type: "audio/wav" });
      }

      if (!fileToUpload)
      {
        setUploadMessage("❌ No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok)
        {
          setUploadMessage("✅ File uploaded successfully!");
        }
        else
        {
          setUploadMessage(`❌ Error: ${data.error}`);
        }
      }
      catch
      {
        setUploadMessage("❌ Error uploading file.");
      }
    };


  const deleteFile = async (filename: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete/${filename}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        setUploadMessage("🗑️ File deleted successfully!");
        setAudioFile(null);
      }
      else {
        setUploadMessage(`❌ Error: ${data.error}`);
      }
    }
    catch {
      setUploadMessage("❌ Error deleting file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="min-w-screen flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <div className="text-xl font-semibold flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            VI
          </div>
          <span className="ml-2 text-gray-900">Pearlyx</span>
        </div>
        <div className="space-x-6">
          <a href="#" className="text-blue-600 font-medium">
            Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-[80vh] space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">Upload or Record Audio</h2>

        {/* File Upload */}
        <div className="flex flex-col items-center space-y-2">
          <input type="file" accept="audio/*" onChange={handleFileChange} className="p-2 border rounded-md" />
          {audioFile && (
          <>
            <p className="text-gray-700">Uploaded: {audioFile.name}</p>
            <button
              onClick={uploadFile}
              className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md"
            >
              Upload
            </button>
            <button
              onClick={() => deleteFile(audioFile.name)}
              className="px-4 py-2 mt-2 bg-red-500 text-white rounded-md ml-2"
            >
              Delete
            </button>
          </>
        )}
        </div>

        {/* Audio Recorder */}
        <div className="flex flex-col items-center space-y-2">
          <ReactMic
            record={recording}
            className="border rounded-md w-64"
            onStop={onStop}
            strokeColor="#4A90E2"
            backgroundColor="#f8f9fa"
          />
          <button
            onClick={toggleRecording}
            className={`px-4 py-2 rounded-md text-white ${recording ? "bg-red-500" : "bg-green-500"}`}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          {recordedBlob && (
          <>
            <audio controls src={URL.createObjectURL(recordedBlob)} />
            <button
              onClick={uploadFile}
              className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md"
            >
              Upload Recording
            </button>
          </>
        )}
        </div>

        {uploadMessage && <p className="mt-4 text-lg font-semibold">{uploadMessage}</p>}
      </main>
    </div>
  );
};

export default App;
