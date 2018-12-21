Bing Spell Checker
==================

This node.js module calls Bing's Spell Check API with the provided text. It returns corrected text if API suggests correction.

Details are here: [Bing Spell Check](https://azure.microsoft.com/en-us/services/cognitive-services/spell-check/)

Install
-------
```
npm install bing-spell-checker
```

How to use?
-----------
You need an API access key. You can get it from here: [Bing Spell Check API Access](https://azure.microsoft.com/en-us/try/cognitive-services/#lang)

> Reading access key through environment variables are a secure way of accessing secret information. Therefore, you should consider setting access key to environment variables.

```javascript
'use strict'

const BingSpellChecker = require('bing-spell-checker')

BingSpellChecker.init({
  'key': process.env.BING_SPELL_CHECK_API_KEY
})

let promise = BingSpellChecker.check('It workd!')
promise.then(function (result) {
  console.log(result) // "Stuff worked!"
}, function (err) {
  console.log(err) // Error: "It broke"
})
```

TODO
----
- Provide a threshold value