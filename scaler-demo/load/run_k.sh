#!/usr/bin/env bash
set -e
if [ -z "$TARGET_URL" ]; then echo "Set TARGET_URL env var"; exit 1; fi
k6 run -e TARGET_URL=$TARGET_URL k6-load.js | tee k6-baseline.txt
