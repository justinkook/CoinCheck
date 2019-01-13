# CoinCheck

A real-time feed of cryptocurrency prices for BTC, ETH, and LTC with historical prices from the last 5 days.

Built using MongoDB, Express, React, and Node.js with Pusher for real time feed.

# Getting Started

1. Checkout the repo

```
git clone git@github.com:bitpay/bitcore.git
git checkout master
yarn install
```

2. Add pusher credentials to server.js and Today.js

Inside server.js

```
const pusher = new Pusher({
    appId: 'appId here',
    key: 'yourkey',
    secret: 'secretkey',
    cluster: 'clusterserver',
    encrypted: true
});
```

Inside Today.js

```
this.pusher = new Pusher('appId', {
			cluster: 'clusterserver',
			forceTLS: true
		});
```

3. Start server and client

```
yarn start
```

# API Routes

### Get Latest prices of BTC, ETH, and LTC in United States Dollars.

GET 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD'

@Return

```
{"BTC":{"USD":3548.77},"ETH":{"USD":115.91},"LTC":{"USD":30.1}}
```

### Post coin prices to the Pusher channel to emit to everyone subscribed to the price channel.

POST '/prices/new'

@Params

```
{
  prices: Return Object from GET route
};
```

@Return

Status 200

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/bitcore) on the main bitcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/justinkook/CoinCheck/blob/master/LICENSE).

Copyright 2019 Justin Kook.
