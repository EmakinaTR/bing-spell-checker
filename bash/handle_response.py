import sys
import json

text = sys.argv[1]
response = json.loads(sys.argv[2])

if 'flaggedTokens' in response:
  for flaggedToken in response['flaggedTokens']:
    text = text.replace(flaggedToken['token'], flaggedToken['suggestions'][0]['suggestion'])

print(text)
