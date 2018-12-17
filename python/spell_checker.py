import sys
import json
import os
from urllib.request import urlopen, Request

lang = 'en-US'
mode = 'proof'
text = sys.argv[1]

settingUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/spellcheck?mkt={}&mode={}'.format(lang, mode)
data = 'text={}'.format(text)
method = 'POST'
headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Ocp-Apim-Subscription-Key': os.environ['BING_SPELL_CHECK_API_KEY']}

response = urlopen(Request(settingUrl, data=data.encode('utf-8'), method=method, headers=headers))
response = json.load(response)

if 'flaggedTokens' in response:
  for flaggedToken in response['flaggedTokens']:
    text = text.replace(flaggedToken['token'], flaggedToken['suggestions'][0]['suggestion'])

print(text)
