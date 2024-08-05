import requests

# URL for the API endpoint
url = 'https://artistic-sunbird-actively.ngrok-free.app/api/generate'

def make_request(prompt):
    data = {
        "model": "Shailesh714/emotion",
        "prompt": prompt,
        "stream": False
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        return response.json().get("response", "No response received")
    else:
        return f"Error: {response.status_code}, {response.text}"

#load model
make_request("")       

def main():
    while True:
        prompt = input("You: ")
        if prompt.lower() == 'exit':
            print("Exiting chat.")
            break
        response = make_request(prompt)
        print("Bot:", response)

if __name__ == "__main__":
    main()
