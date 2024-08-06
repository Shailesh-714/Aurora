#!/bin/bash

# Install Ollama
curl -fsSL https://ollama.com/install.sh | sed 's#https://ollama.com/download#https://github.com/jmorganca/ollama/releases/download/v0.1.27#' | sh

ngrok config add-authtoken 2fb0g0mRnwBSSNVgVy8lBrhJF8M_2R1xDsvtZjMpHGFe7DvkZ
# Install Python packages
pip install ngrok pyngrok requests accelerate flask

