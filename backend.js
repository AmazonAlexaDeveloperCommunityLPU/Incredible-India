const Alexa = require('ask-sdk-core');
const data = [
    'India has the largest postal network in the world with over 1, 55,015 post offices. A single post office on an average serves a population of 7,175 people. The floating post office in Dal Lake, Srinagar, was inaugurated in August 2011.',
    'The 2011 Kumbh Mela was the largest gathering of people with over 75 million pilgrims. The gathering was so huge that the crowd was visible from space.',
    'Mawsynram, a village on the Khasi Hills, Meghalaya, receives the highest recorded average rainfall in the world. Cherrapunji, also a part of Meghalaya, holds the record for the most rainfall in the calendar year of 1861.',
    'It took a total of 2,57,00,000 man hours for completion and also weighs as much as 50,000 African elephants. A true engineering and architectural marvel.',
    'At an altitude of 2,444 meters, the Chail Cricket Ground in Chail, Himachal Pradesh, is the highest in the world. It was built in 1893 and is a part of the Chail Military School.',
    'Shampoo was invented in India, not the commercial liquid ones but the method by use of herbs. The word shampoo itself has been derived from the Sanskrit word champu, which means to massage.',
    'India has won all 5 mens Kabaddi World Cups held till now and have been undefeated throughout these tournaments. The Indian womens team has also won all Kabaddi World Cups held till date.',
    'In September 2009, Indias ISRO Chandrayaan- 1 using its Moon Mineralogy Mapper detected water on the moon for the first time.',
    'The father of Indias missile programme had visited Switzerland back in 2006. Upon his arrival, Switzerland declared May 26th as Science Day.',
    'When Dr Rajendra Prasad was appointed the President of India, he only took 50% of his salary, claiming he did not require more than that. Towards the end of his 12-year tenure he only took 25% of his salary. The salary of the President was Rs 10,000 back then.',
    'The first rocket was so light and small that it was transported on a bicycle to the Thumba Launching Station in Thiruvananthapuram, Kerala.',
    'Elephants receive baths, massages and even food at the Punnathoor Cotta Elephant Yard Rejuvenation Centre in Kerala. Now thats a BIG step for the country.',
    'India is second only to the USA when it comes to speaking English with around 125 million people speaking the language, which is only 10% of our population. This is expected to grow by quite a margin in the coming years.'
];

const GET_FACT_MESSAGE = "This is your Fact ";

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome, you can get to know about a space fact by asking me "Tell me a fact"';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const GetNewFactIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'GetNewFactIntent';
    },
    handle(handlerInput) {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;


        const speechText = speechOutput;
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetNewFactIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();