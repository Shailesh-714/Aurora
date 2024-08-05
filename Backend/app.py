import requests

url = 'https://artistic-sunbird-actively.ngrok-free.app/api/chat'

modelName = input("enter the doctor name : ")

def make_request(messages):
    data = {
        "model": modelName,
        "messages": messages, 
        "stream": False,

    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}, {response.text}"

response = make_request("")
print(response)       

def main():
    messages = []
    while True:
        prompt = input("You: ")
        if prompt.lower() == 'exit':
            print("Exiting chat.")
            break
        messages.append({"role": "user", "content": prompt})
        response = make_request(messages[-15:])
        messages.append({"role": "assistant", "content": response['message']['content']})
        print("Bot:", response['message']['content']) 

if __name__ == "__main__":
    main()


