const express = require('express')
const route = express()

route.get('/', function(req, res, next) {
    res.sendFile('./../front/dist/index.html')
});

module.exports = route


