/*!
 * License: MIT
 * Author: Mustafa İlhan
 */

'use strict'

const https = require('https')

let properties = {
  'host': 'api.cognitive.microsoft.com',
  'path': '/bing/v7.0/spellcheck'
}

function isEmpty (str) {
  return !str || str.length === 0
}

function correctSpellingErrors (text, response) {
  if (!isEmpty(response.flaggedTokens)) {
    for (let i = 0, ii = response.flaggedTokens.length; i !== ii; i++) {
      let flaggedToken = response.flaggedTokens[i]
      text = text.replace(flaggedToken['token'], flaggedToken['suggestions'][0]['suggestion'])
    }
  }
  return text
}

module.exports.init = function (props) {
  properties['host'] = props['host'] || properties['host']
  properties['path'] = props['path'] || properties['path']
  properties['key'] = props['key'] || properties['key']
  properties['clientLocation'] = props['clientLocation'] || properties['clientLocation']
  properties['clientId'] = props['clientId'] || properties['clientId']
  properties['clientIp'] = props['clientIp'] || properties['clientIp']
}

module.exports.check = function (text, lang = 'en-US', mode = 'proof') {
  if (isEmpty(text)) {
    return new Promise((resolve, reject) => {
      reject('text can not be empty. Please provide a text.')
    })
  }
  if (isEmpty(properties.key)) {
    return new Promise((resolve, reject) => {
      reject('key can not be empty. Please provide a key.')
    })
  }

  let queryString = '?mkt=' + lang + '&mode=' + mode
  let requestParams = {
    'method': 'POST',
    'hostname': properties.host,
    'path': properties.path + queryString,
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': text.length + 5,
      'Ocp-Apim-Subscription-Key': properties.key
    }
  }

  if (!isEmpty(properties['clientLocation'])) {
    requestParams['headers']['X-Search-Location'] = properties['clientLocation']
  }
  if (!isEmpty(properties['clientId'])) {
    requestParams['headers']['X-MSEdge-ClientID'] = properties['clientId']
  }
  if (!isEmpty(properties['clientIp'])) {
    requestParams['headers']['X-MSEdge-ClientIP'] = properties['clientIp']
  }

  return new Promise((resolve, reject) => {
    let req = https.request(requestParams, (response) => {
      let body = ''
      response.on('data', function (d) {
        body += d
      })
      response.on('end', function () {
        body = JSON.parse(body)
        // console.log(body)
        if (body['statusCode']) {
          reject('Error on bing-spell-checker: ' + body['message'])
        } else {
          resolve(correctSpellingErrors(text, body))
        }
      })
      response.on('error', function (e) {
        reject('Error on bing-spell-checker: ' + e.message)
      })
    })
    req.write('text=' + text)
    req.end()
  })
}
