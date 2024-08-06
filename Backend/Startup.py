import subprocess
import time
import os
import requests
 
# Function to install dependencies
# Function to start a process
def start_process(command):
    return subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)


# Start ngrok and Ollama services
print("Starting ngrok with specified domain...")
ngrok_command = "ngrok http --domain=artistic-sunbird-actively.ngrok-free.app 11434"
ngrok_process = start_process(ngrok_command)

ollama_command = "ollama serve"
ollama_process = start_process(ollama_command)

time.sleep(10)  # Adjust as necessary

process = subprocess.Popen(['bash', 'modelSetup.sh'])

# Wait for the process to complete
process.wait()

# Print completion message
print("modelSetup.sh has completed.")

os.environ["OLLAMA_HOST"] = "https://artistic-sunbird-actively.ngrok-free.app/"
print("OLLAMA_HOST set to https://artistic-sunbird-actively.ngrok-free.app/")
time.sleep(1)


# Optional: Wait for processes to complete or handle termination signals
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Stopping services...")
    ngrok_process.terminate()
    ollama_process.terminate()
    ngrok_process.wait()
    ollama_process.wait()
    print("Services stopped.")
