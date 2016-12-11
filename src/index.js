'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var userID = "8xkgxhnwJJSVDfS";
var ApiToken = "8bi2H83KEOUB1Gw54Z7W83AF5/cIRkcGvo4WhZFbnly+hRIZlI5P907L1ufN4kOYVJ25sFnO9NL75kOhG8YyTg==";



var languageStrings = {
    "en-US": {
        "translation": {
            "FACTS": [
                "A year on Mercury is just 88 days long.",
                "The Moon is moving approximately 3.8 cm away from our planet every year."],
	    "ListOfJobs": [],
            "SKILL_NAME" : "American Space Facts",
            "GET_FACT_MESSAGE" : "Here's your fact: ",
            "HELP_MESSAGE" : "You can say tell me a space fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};