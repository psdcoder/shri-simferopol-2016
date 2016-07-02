# Obfuscator solution

# Description

Obfuscator function for css classnames. Obfuscate passed classnames to shortest versions, sorted by count of usages.
Tested in Node.js v6.2.2

# Usage

## Node.js

```javascript
const obfuscator = require('obfuscator-location/index');

const results = obfuscator(['classname1', 'classname2', 'etc', ...]);
```

## CLI

Also you can use obfuscator from your command line interface:

```sh
./bin/obfuscator path/to/datafile.json
```

Result will be printed to STDOUT, so you can pipe it to file:

```sh
./bin/obfuscator path/to/datafile.json > results.json

```

For testing purposes there are test `data.json` file in `test` folder, so you can try obfuscate it:

```sh
./bin/obfuscator test/data.json > results.json
```

# Tests

Package contains tests. For run it you must run these commands:

1. `npm install`
2. `npm test`
