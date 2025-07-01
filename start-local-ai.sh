#!/bin/bash

echo "🚀 Starting local AI services for Flowmatik..."

if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama not found. Installing..."
    curl -fsSL https://ollama.ai/install.sh | sh
fi

echo "🦙 Starting Ollama..."
ollama serve &
OLLAMA_PID=$!
sleep 10

echo "📥 Pulling Llama 3.1 8B model..."
ollama pull llama3.1:8b

echo "📥 Pulling Phi-3 3.8B model..."
ollama pull phi3:3.8b

if [ ! -d "stable-diffusion-webui" ]; then
    echo "🎨 Cloning Stable Diffusion WebUI..."
    git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
fi

echo "🎨 Starting Stable Diffusion WebUI..."
cd stable-diffusion-webui
chmod +x webui.sh
./webui.sh --api --listen --port 7860 --skip-torch-cuda-test &
SD_PID=$!
cd ..

if ! command -v jan &> /dev/null; then
    echo "💬 Installing Jan..."
    wget -O jan.deb https://github.com/janhq/jan/releases/latest/download/jan-linux-amd64.deb
    sudo dpkg -i jan.deb || sudo apt-get install -f -y
    rm jan.deb
fi

echo "💬 Starting Jan..."
jan start --api-port 1337 &
JAN_PID=$!

echo "✅ All local AI services started!"
echo "🦙 Ollama: http://localhost:11434"
echo "🎨 Stable Diffusion: http://localhost:7860"
echo "💬 Jan: http://localhost:1337"
echo ""
echo "📝 Process IDs:"
echo "Ollama: $OLLAMA_PID"
echo "Stable Diffusion: $SD_PID"
echo "Jan: $JAN_PID"
echo ""
echo "To stop services, run: kill $OLLAMA_PID $SD_PID $JAN_PID"

echo "Press Ctrl+C to stop all services..."
wait
