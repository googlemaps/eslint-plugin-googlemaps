# eslint-plugin-googlemaps

[![npm](https://img.shields.io/npm/v/eslint-plugin-googlemaps)](https://www.npmjs.com/package/eslint-plugin-googlemaps)
![Build](https://github.com/googlemaps/eslint-plugin-googlemaps/workflows/Test/badge.svg)
![Release](https://github.com/googlemaps/eslint-plugin-googlemaps/workflows/Release/badge.svg)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/eslint-plugin-googlemaps?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Discord](https://img.shields.io/discord/676948200904589322?color=6A7EC2&logo=discord&logoColor=ffffff)](https://discord.gg/jRteCzP)

## Description

[ESLint](https://eslint.org) plugin with rules specific to Google Maps Platform JavaScript API.

## Install

Available via npm as the package [eslint-plugin-googlemaps](https://www.npmjs.com/package/eslint-plugin-googlemaps).

```sh
npm i -D eslint-plugin-googlemaps
```

## Usage

To use rules provided by the plugin, use the following:

`eslintrc.json`:

```json
{
  "extends": ["plugin:googlemaps/recommended"]
  "plugins": ["googlemaps"],
}
```

Some rules are fixable with `eslint --fix`. For example the [place-fields](docs/rules/place-fields.md) rule.

```js
service.getDetails({place_id: 'foo'})
```
becomes

```js
service.getDetails({fields: /** TODO: Add necessary fields to the request */ [], place_id: 'foo'})
```

## Rules

| Rule                                                         | Description                        | Configurations   | Type         |
| ------------------------------------------------------------ | ---------------------------------- | ---------------- | ------------ |
| [no-api-keys](docs/rules/no-api-keys.md)                     | Keep API keys out of code.         | ![recommended][] | ![suggest][] |
| [place-fields](docs/rules/place-fields.md)                   | Always use place fields.           | ![recommended][] | ![fixable][] |
| [require-js-api-loader](docs/rules/require-js-api-loader.md) | Require @googlemaps/js-api-loader. | ![recommended][] | ![suggest][] |

[recommended]: https://img.shields.io/badge/-recommended-lightgrey.svg
[suggest]: https://img.shields.io/badge/-suggest-yellow.svg
[fixable]: https://img.shields.io/badge/-fixable-green.svg
[style]: https://img.shields.io/badge/-style-blue.svg
