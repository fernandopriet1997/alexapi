

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hola mundo.';
        return handlerInput.responseBuilder
            .speak("Hola mundo")
            .reprompt("Hello World", speechText)
            .getResponse();
    }
}


module.exports = { HelloWorldIntentHandler };