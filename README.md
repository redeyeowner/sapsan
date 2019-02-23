Complex web framework in OOP style for [node](http://nodejs.org).
For now it is on the stage on development and can't be used for real projects because not all core features are developed.
**2.0.0 version will be stable version. It is not recommended to use it before.**

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Package License][license-image]][license-url]
  [![Build Status](build-status-image)](build-status)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 7.10 or higher is required.


```bash
$ npm install sapsan
```

## Docs & Community
  * Visit the [Wiki](https://github.com/redeyeowner/sapsan/wiki)

## Future Features
  - create CLI(it is in development for now)
  - coverage by tests

## Philosophy
Flow of request is next:
...validators ->
...serializers ->
...middlewares ->
mainHandler ->
...exceptionFilters/...deserializers

## People

The original author of Sapsan is [Oleh Mushka](https://github.com/redeyeowner)


[List of all contributors](https://github.com/redeyeowner/sapsan/graphs/contributors)

## Support

Sapsan is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please let me know(You can use [Telegram](https://web.telegram.org/#/im?p=@olehmushka) or [Linkedin](https://www.linkedin.com/in/oleh-mushka-b61043148/) or [olegamysk@gmail.com](olegamysk@gmail.com)).

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/sapsan.svg
[npm-url]: https://npmjs.org/package/sapsan
[downloads-image]: https://img.shields.io/npm/dm/sapsan.svg
[downloads-url]: https://npmjs.org/package/sapsan
[license-image]: https://img.shields.io/npm/l/sapsan.svg
[license-url]: https://npmjs.org/package/sapsan
[build-status-image]: https://travis-ci.org/redeyeowner/sapsan.svg?branch=1.0.3
[build-status]: https://travis-ci.org/redeyeowner/sapsan
