const Alexa = require('ask-sdk-core');

const { SessionEndedRequest, HelpIntent, CancelAndStopIntentHandler, UnhandledIntent } = require('./intents/amazonIntents');
const { HelloWorldIntentHandler } = require('./intents/HelloWorldIntent');
const { SaludoIntentHandler } = require('./intents/SaludoIntent');
const { LaunchRequest } = require('./intents/LaunchIntent');
const { errorHandler } = require('./errorHandler');

const createSkill = () => {
    const skillbuilder = Alexa.SkillBuilders.custom();
    return skillbuilder.addRequestHandlers(
        LaunchRequest,
        HelloWorldIntentHandler,
        SaludoIntentHandler,
        SessionEndedRequest,
        HelpIntent,
        CancelAndStopIntentHandler,
        UnhandledIntent
    )
        .withApiClient(new Alexa.DefaultApiClient())
        .withCustomUserAgent('prueba/v1')
        .addErrorHandler(errorHandler)
        .create()
}

module.exports = { createSkill }