# eslint-plugin-googlemaps

[![npm](https://img.shields.io/npm/v/eslint-plugin-googlemaps)](https://www.npmjs.com/package/eslint-plugin-googlemaps)
![Build](https://github.com/googlemaps/eslint-plugin-googlemaps/workflows/Build/badge.svg)
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
  "extends": ["plugin:googlemaps:recommended"]
  "plugins": ["googlemaps"],
}
```

## Rules

* `googlemaps/no-api-keys`: [recommended] Disallow Google Maps Platform API keys in source code.
