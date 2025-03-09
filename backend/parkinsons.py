import os
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("Gemini API key is missing! Please add it to the .env file.")

def classify_parkinsons_info(text: str) -> str:
    """
    Classifies the text for Parkinson's disease symptoms, and provides next steps.
    Returns a string of recommendations based on classification.
    """
    prompt = (
        "Classify the following information as related to Parkinson's disease or not. "
        "Return 1 if it is related to Parkinson's disease, and 0 if it is not. "
        "If related to Parkinson's disease, return the symptoms and recommend next steps. "
        "If not related, provide suggestions for keeping safe and monitoring health.\n\n"
        f"Text: '''{text}'''"
    )

    payload = {
        "model": "gemini-pro",
        "prompt": prompt,
        "temperature": 0.7,
    }

    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(
            "https://api.gemini.google.com/v1/generate",
            json=payload,
            headers=headers,
        )

        response.raise_for_status()

        data = response.json()

        result = data.get('text', '').strip()

        if result == "1":
            symptoms = "Symptoms identified include tremors, rigidity, and slow movement."
            next_steps = "It's important to consult a doctor for diagnosis and start treatment options, which may include medication and physical therapy."
            return f"Parkinson's Disease identified. Symptoms: {symptoms} Next steps: {next_steps}"

        elif result == "0":
            safety_steps = "Monitor your health regularly, stay active, and eat a balanced diet. If any neurological symptoms arise, consult a healthcare professional."
            return f"Not related to Parkinson's Disease. Future steps: {safety_steps}"

        else:
            return "Unable to classify. Please check the response."

    except requests.exceptions.RequestException as e:
        print(f"Error during Gemini API request: {e}")
        return "Error in API request. Please try again."

def main():
    parkinsons_text = "Patient shows tremors and rigidity in their muscles, which are typical symptoms of Parkinson's disease."

    result = classify_parkinsons_info(parkinsons_text)
    print(f"Result: {result}")

if __name__ == "__main__":
    main()
