const express = require('express')
const Alexa = require('ask-sdk-core')
const { ExpressAdapter } = require('ask-sdk-express-adapter')
const { createSkill } = require('../src/skillHandler')
const alexaApp = express()



const adapter = new ExpressAdapter(skill, false, false)

alexaApp.post('/', adapter.getRequestHandlers())

module.exports = alexaApp


