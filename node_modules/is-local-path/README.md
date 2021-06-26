# is-local-path

Test whether a path is local.

[![npm version](https://img.shields.io/npm/v/is-local-path.svg)](https://www.npmjs.com/package/is-local-path)
[![npm license](https://img.shields.io/npm/l/is-local-path.svg)](https://www.npmjs.com/package/is-local-path)
[![Travis](https://img.shields.io/travis/panosoft/is-local-path.svg)](https://travis-ci.org/panosoft/is-local-path)
[![David](https://img.shields.io/david/panosoft/is-local-path.svg)](https://david-dm.org/panosoft/is-local-path)
[![npm downloads](https://img.shields.io/npm/dm/is-local-path.svg)](https://www.npmjs.com/package/is-local-path)

## Installation

```sh
npm install is-local-path
```

## Usage

```js
var isLocalPath = require('is-local-path');

isLocalPath('/path/to/file.ext')); // true
isLocalPath('/path/to/directory')); // true
isLocalPath('./relative/path')); // true
isLocalPath('../relative/path')); // true

isLocalPath('http://host.com/path/to/file.ext')); // false
isLocalPath('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')); // false
```

## API

- [`isLocalPath`](#isLocalPath)

---

<a name="isLocalPath"></a>
### isLocalPath ( string )

Tests whether a `string` is a local path.

__Arguments__

- `string` - A string to test.
