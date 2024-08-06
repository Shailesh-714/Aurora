import requests
import json

url = 'https://artistic-sunbird-actively.ngrok-free.app/api/chat'

modelName = input("Enter the doctor name: ")

def make_request(messages):
    data = {
        "model": modelName,
        "messages": messages, 
        "stream": True,  # Enable streaming
    }
    response = requests.post(url, json=data, stream=True)
    if response.status_code == 200:
        return response
    else:
        return f"Error: {response.status_code}, {response.text}"

def main():
    messages = []
    while True:
        prompt = input("You: ")
        if prompt.lower() == 'exit':
            print("Exiting chat.")
            break
        messages.append({"role": "user", "content": prompt})
        response = make_request(messages[-15:])
        if isinstance(response, str):  # Check if an error occurred
            print(response)
        else:
            print("Bot: ", end="", flush=True)
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    try:
                        data = json.loads(chunk.decode('utf-8'))
                        print(data['message']['content'], end="", flush=True)
                    except json.JSONDecodeError:
                        continue
            print()  # Print a newline at the end of the response

if __name__ == "__main__":
    main()
