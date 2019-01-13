const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')

var pusher = new Pusher({
    appId: '690501',
    key: 'c0783d10bbc556b7b275',
    secret: '9cf8592cc237bbeeb937',
    cluster: 'us2',
    encrypted: true
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
})

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.post('/prices/new', (req, res) => {
    pusher.trigger('coin-prices', 'prices', {
        prices: req.body.prices
    });
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Node app is running on port ${PORT}`)
})
