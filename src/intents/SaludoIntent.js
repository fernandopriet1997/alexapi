
const SaludoIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'SaludoIntent';
    },
    handle(handlerInput) {
        const fs = require('fs')
        const speechText = 'Hola mundo.';
        const order = {
            'type': "animation",
            'action': 'saludo'
        }
        fs.writeFileSync('test.txt', JSON.stringify(order))
        return handlerInput.responseBuilder
            .speak("El Centro de mando te saluda")
            .reprompt("Hello World", speechText)
            .getResponse();
    }
}


module.exports = { SaludoIntentHandler };