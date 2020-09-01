Backbase Protractor Accessibility Plugin
========================================

## Install

```shell
npm install --save-dev @bb-cli/bb-protractor-accessibility-plugin
```

### Requirements
- [Node.js](http://nodejs.org/) v0.11.15 or higher

## Implement

Enable this plugin inside your protractor.conf.js

```js
  exports.config = {
      ...
      plugins: [{
        axe: true,
        warnOnly: false,
        package: '@bb-cli/bb-protractor-accessibility-plugin'
      }]
    }
```

Copyright © 2020 Backbase B.V.