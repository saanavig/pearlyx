import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

#debugging
print(f"API Key loaded: {'Yes' if GEMINI_API_KEY else 'No'}")  # Safe debugging output

if not GEMINI_API_KEY:
    raise ValueError("Gemini API key is missing! Please add it to the .env file.")

#for testing ai responses (prolly not gonna use it...)
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
            "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
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

def get_parkinsons_chat_response(message: str) -> str:
    try:
        url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" 

        payload = {
            "contents": [{
                "parts": [{
                    "text": message
                }]
            }],
            "generationConfig": {
                "temperature": 0.7,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 1024,
            }
        }

        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY
        }

        print(f"Sending request to Gemini API...")  # Debug log
        response = requests.post(url, json=payload, headers=headers)
        print(f"Response status: {response.status_code}")  # Debug log

        if response.status_code != 200:
            print(f"API Error Response: {response.text}")  # Debug log
            return "I apologize, but there was an error processing your request."

        data = response.json()
        print(f"API Response: {data}")  # Debug log

        # Extract text from the response
        if "candidates" in data:
            return data["candidates"][0]["content"]["parts"][0]["text"].strip()
        elif "text" in data:
            return data["text"].strip()
        else:
            print(f"Unexpected response structure: {data}")
            return "I apologize, but I received an unexpected response format."

    except Exception as e:
        print(f"Error in get_parkinsons_chat_response: {str(e)}")
        return f"I apologize, but I'm having trouble responding right now. Error: {str(e)}"

def main():
    parkinsons_text = "Patient shows tremors and rigidity in their muscles, which are typical symptoms of Parkinson's disease."

    result = classify_parkinsons_info(parkinsons_text)
    print(f"Result: {result}")

if __name__ == "__main__":
    main()
