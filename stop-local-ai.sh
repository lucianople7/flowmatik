#!/bin/bash

echo "🛑 Stopping local AI services..."

pkill -f "ollama serve"

pkill -f "webui.sh"
pkill -f "python.*launch.py"

pkill -f "jan"

echo "✅ All local AI services stopped!"
