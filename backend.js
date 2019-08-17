/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'incredible India Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a incredible india fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
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
    'India is second only to the USA when it comes to speaking English with around 125 million people speaking the language, which is only 10% of our population. This is expected to grow by quite a margin in the coming years.',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
