Bing Spell Checker
==================
Bash script version of spell checker.

Requirements
------------
curl and python is required.

BING_SPELL_CHECK_API_KEY value must be set as environment value
```
$ export BING_SPELL_CHECK_API_KEY='your_key'
```

Usage
-----
```
$ ./spell_checker.sh 'It workd!'
```

TODO
----
- Read other parameters from command line
- Add tests
- Provide a threshold value