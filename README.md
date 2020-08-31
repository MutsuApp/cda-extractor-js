# cda-extractor-js

[![npm version](https://badge.fury.io/js/cda-extractor-js.svg)](https://badge.fury.io/js/cda-extractor-js)

## Instalation

#### YARN

```
yarn add cda-extractor-js
```

#### NPM

```
npm install cda-extractor-js --save
```

## Usage

```js
const cda = require('cda-extractor-js');

cda.extractVideo("id").then(url => {
    console.log(url);
})
```