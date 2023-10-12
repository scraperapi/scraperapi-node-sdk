# ScraperAPI Node.js SDK
Node.js SDK for the web scraping service provided by [ScraperAPI](https://www.scraperapi.com/).

# Installation
```bash
npm install --save scraperapi-sdk
```

# Examples

## Simple GET request

```javascript
const scraperapiClient = require('scraperapi-sdk')('APIKEY');

scraperapiClient.get('http://httpbin.org/ip')
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  });
```

## POST and PUT requests
You can simply use one of the shorthand methods (`scraperapiClient.post` or `scraperapiClient.put`) to send a POST or PUT request.

```javascript
const scraperapiClient = require('scraperapi-sdk')('APIKEY');

options = {
  body: JSON.stringify({ foo: 'bar' }),
  headers: {
      'Content-Type': 'application/json',
  }
};

//POST
scraperapiClient.post('http://httpbin.org/anything', options)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })

//PUT
scraperapiClient.put('http://httpbin.org/anything', options)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

## Customizing requests

### Headers

```javascript
const scraperapiClient = require('scraperapi-sdk')('APIKEY');

scraperapiClient.get('http://httpbin.org/anything', {
  headers: { 'X-MyHeader': '123' }
}).then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
});
```

### Other parameters
For a list of available parameters, please see our [documentation](https://docs.scraperapi.com/v/nodejs/making-requests/customizing-requests)

```javascript
const scraperapiClient = require('scraperapi-sdk')('APIKEY');

scraperapiClient.get('http://httpbin.org/anything', {
  country_code: 'us',
  render: true
}).then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
});
```

## Account information
If you would like to monitor your account usage and limits programmatically (how many concurrent requests you’re using, how many requests you’ve made, etc.) you may use the /account endpoint, which returns JSON.

```javascript
const scraperapiClient = require('scraperapi-sdk')('APIKEY');

scraperapiClient.account()
  .then(response => console.log(response));
```

# Documentation
For a detailed documentation please visit [https://docs.scraperapi.com/](https://docs.scraperapi.com/)