# ipld-format-to-blockcodec <!-- omit in toc -->

> Convert an [IPLD Format](https://www.npmjs.com/package/interface-ipld-format) module into a [BlockCodec](https://github.com/multiformats/js-multiformats/blob/master/src/codecs/interface.ts#L21)
for use with the [multiformats](https://www.npmjs.com/package/multiformats) module.

## Table of contents <!-- omit in toc -->

- [Install](#install)
  - [Use](#use)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

```console
$ npm i ipld-format-to-blockcodec
```

### Use

```javascript
const { convert } = require('ipld-format-to-blockcodec')
const ipldGit = require('ipld-git')

const codec = convert(dagCbor)

// use BlockCodec methods
console.info(format.code)
console.info(format.encode)
console.info(format.decode)
// etc..
```

## API

https://ipld.github.io/js-ipld-format-to-blockcodec/

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipld/js-ipld-format-to-blockcodec/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)

## License

This project is dual-licensed under Apache 2.0 and MIT terms:

- Apache License, Version 2.0, ([LICENSE-APACHE](https://github.com/ipld/js-ipld-format-to-blockcodec/blob/master/LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license ([LICENSE-MIT](https://github.com/ipld/js-ipld-format-to-blockcodec/blob/master/LICENSE-MIT) or http://opensource.org/licenses/MIT)
