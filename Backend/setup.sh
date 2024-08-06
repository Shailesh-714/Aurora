#!/bin/bash

# Install Ollama
curl -fsSL https://ollama.com/install.sh | sed 's#https://ollama.com/download#https://github.com/jmorganca/ollama/releases/download/v0.1.27#' | sh

# Install Python packages
pip install requests accelerate

# Function to start a process
start_process() {
  command=$1
  $command > >(tee /dev/stderr) 2>&1 &
  echo $!  # Return the PID of the process
}

# Function to stop a process
stop_process() {
  pid=$1
  kill $pid
  wait $pid 2>/dev/null
}

# Start Ollama service
ollama_command="ollama serve"
ollama_pid=$(start_process "$ollama_command")

# Wait a bit to ensure the Ollama service starts
sleep 5

# Run the ollama pull command
ollama pull llama3.1

# Doctors list
doctors="psychatrist gynaecologist pediatrician dermatologist"

# Loop through each item and create the configurations
for doc in $doctors
do
  ollama create $doc -f ./configFiles/$doc.txt
done

# Stop the Ollama service
stop_process $ollama_pid