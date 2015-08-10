# examplr

Build and demo code examples.

[![Travis build status](http://img.shields.io/travis/thejameskyle/examplr.svg?style=flat)](https://travis-ci.org/thejameskyle/examplr)
[![Code Climate](https://codeclimate.com/github/thejameskyle/examplr/badges/gpa.svg)](https://codeclimate.com/github/thejameskyle/examplr)
[![Test Coverage](https://codeclimate.com/github/thejameskyle/examplr/badges/coverage.svg)](https://codeclimate.com/github/thejameskyle/examplr)
[![Dependency Status](https://david-dm.org/thejameskyle/examplr.svg)](https://david-dm.org/thejameskyle/examplr)
[![devDependency Status](https://david-dm.org/thejameskyle/examplr/dev-status.svg)](https://david-dm.org/thejameskyle/examplr#info=devDependencies)

## Basic Usage

```html
<!-- examples.html -->
<div id="examplr"></div>
<script src="example-bundle.js"></script>
```

```js
// examples.js
var example = require('examplr')();

example('My Cool Example', function(el) {
  el.textContent = 'Hello World!';
});
```

```shell
$ browserify examples.js -o example-bundle.js --debug
$ open examples.html
```
