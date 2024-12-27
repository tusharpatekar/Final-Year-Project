import base64
import requests

def get_more_info(filepath, dis):
    with open(filepath, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    headers = {
        "Content-Type": "application/json",
    }
    params = {
        "key": 'AIzaSyBEJH11MrafgUTwsctPApPnokIq0DCNTrY'
    }
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "inlineData": {
                            "mimeType": "image/jpeg",
                            "data": encoded_image
                        }
                    },
                    {
                        "text": "Analyze this image and detect plant disease. give response such that crop name, disease, suggestion if image not clear or you are uncertain about it return only unable to fatch do not give extra lines"
                    }
                ]
            }
        ]
    }

    response = requests.post(url, headers=headers, params=params, json=payload)

    if response.status_code == 200:
        result = response.json()
        return result['candidates'][0]['content']['parts'][0]['text']
    else:
        return None
