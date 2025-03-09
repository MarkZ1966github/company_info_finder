#!/bin/bash

# Kill any existing node processes
pkill -f "node" || echo "No node processes to kill"

# Start the server
cd "$(dirname "$0")"
npm run dev