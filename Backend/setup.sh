#!/bin/bash

# Install Ollama
curl -fsSL https://ollama.com/install.sh | sed 's#https://ollama.com/download#https://github.com/jmorganca/ollama/releases/download/v0.1.27#' | sh

bash modelSetup.sh &

# Get the process ID (PID) of the last background process
pid=$!

# Wait for the process to complete
wait $pid

echo "modelSetup.sh has completed."

ngrok config add-authtoken 2fb0g0mRnwBSSNVgVy8lBrhJF8M_2R1xDsvtZjMpHGFe7DvkZ
# Install Python packages
pip install ngrok pyngrok requests accelerate flask

# Start ngrok service
python Startup.py 

