#!/bin/bash

# Temporarily move API routes during production build
API_DIR="app/api"
TEMP_DIR="../api.tmp"

# Clean build cache
echo "Cleaning build cache..."
rm -rf .next

if [ -d "$API_DIR" ]; then
  echo "Moving API routes to temporary location..."
  mv "$API_DIR" "$TEMP_DIR"
fi

# Run the build
echo "Building application..."
next build

# Restore API routes
if [ -d "$TEMP_DIR" ]; then
  echo "Restoring API routes..."
  mv "$TEMP_DIR" "$API_DIR"
fi
