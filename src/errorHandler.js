const Alexa = require('ask-sdk-core');

const errorHandler = {
    canHandle() {
        // Handle _all_ exceptions
        return true;
    },
    handle(error) {
        console.log(error);
    
        const speech = 'El centro de mando tiene problemas';
    
        return Alexa.HandlerInput.responseBuilder
          .speak(speech)
          .reprompt(speech)
          .getResponse();
      }
}

module.exports = { errorHandler }