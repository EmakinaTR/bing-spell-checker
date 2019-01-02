/*!
 * License: MIT
 * Author: Mustafa İlhan
 */

'use strict'

const BingSpellChecker = require('../index.js')

let scenarios = [
  {
    'testCase': 'empty_key',
    'text': 'Hello',
    'expected': 'Key can not be empty. Please provide a key.',
    'key': ''
  },
  {
    'testCase': 'empty_text',
    'text': '',
    'expected': 'Text can not be empty. Please provide a text.',
    'key': process.env.BING_SPELL_CHECK_API_KEY
  },
  {
    'testCase': 'wrong_key',
    'text': 'It workd!',
    'expected': 'Access denied due to invalid subscription key. Make sure to provide a valid key for an active subscription.',
    'key': 'asd'
  },
  {
    'testCase': 'correct_text',
    'text': 'It workd!',
    'expected': 'It works!',
    'key': process.env.BING_SPELL_CHECK_API_KEY
  }
]

let passed = []
let failed = []

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function check (testCase, expected, result) {
  if (expected === result) {
    passed.push(testCase)
  } else {
    failed.push(testCase)
    console.log('Test case: ' + testCase + ' failed. Expecting: "' + expected + '", returned: "' + result + '"')
  }
}

async function test (testCase, text, expected, key) {
  BingSpellChecker.init({
    'key': key
  })

  let promise = BingSpellChecker.check(text)
  await promise.then(function (result) {
    check(testCase, expected, result)
  }, function (err) {
    check(testCase, expected, err.message)
  })
}

async function runTests () {
  for (let i = 0, ii = scenarios.length; i !== ii; i++) {
    await test(scenarios[i].testCase, scenarios[i].text, scenarios[i].expected, scenarios[i].key)
    // Bing API has a rate limit, therefore we need wait at least 1 second.
    await sleep(1000)
  }

  if (failed.length === 0) {
    console.log('Passed all.')
    process.exit()
  } else {
    console.log('Failed (' + (failed.length) + ') Passed (' + (passed.length) + ').')
    process.exit(1)
  }
}

runTests()
