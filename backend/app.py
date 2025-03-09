import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
# import parselmouth
from analyzer import Analyzer
from parkinsons import classify_parkinsons_info

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"wav", "mp3", "m4a"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    return "Pearlyx Backend is Running!"

@app.route("/upload", methods=["POST"])
def upload_audio():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        return jsonify({
            "message": "File uploaded successfully!",
            "filepath": filepath,
            "filename": filename
        }), 200

    return jsonify({"error": "Invalid file type"}), 400

@app.route("/analyze", methods=["POST"])
def analyze_audio():
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 415

        data = request.get_json()
        filename = data.get("filename")
        needs_classification = data.get("needs_classification", False)

        if not filename:
            return jsonify({"error": "No filename provided"}), 400
            
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

        if not os.path.exists(file_path):
            return jsonify({"error": f"File not found: {file_path}"}), 404

        analyzer = Analyzer(file="models/model.pkl")
        features = analyzer.get_features(file_path)
        prediction_result = analyzer.predict(features)

        response_data = {
            "prediction": prediction_result,
            "status": "success"
        }

        if needs_classification and prediction_result['prediction'] == 1:
            additional_info = classify_parkinsons_info("Detected symptoms based on audio analysis.")
            response_data["classification"] = additional_info

        return jsonify(response_data), 200

    except Exception as e:
        print(f"Error in analyze_audio: {str(e)}")
        return jsonify({
            "error": f"Analysis failed: {str(e)}",
            "status": "error"
        }), 500

@app.route("/delete/<filename>", methods=["DELETE"])
def delete_file(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"File Deleted: {file_path}")
        return jsonify({"message": "File deleted successfully!"}), 200
    else:
        return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
