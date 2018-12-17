#!/bin/bash

LANG='en-US'
MODE='proof'
TEXT=$1

RESPONSE=$(curl -s "https://api.cognitive.microsoft.com/bing/v7.0/spellcheck?mkt=$LANG&mode=$MODE" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Ocp-Apim-Subscription-Key: $BING_SPELL_CHECK_API_KEY" \
  -X POST \
  -d "text=$TEXT")

python handle_response.py "$TEXT" "$RESPONSE" 
