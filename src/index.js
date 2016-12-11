'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
   "en-US":{
      "translation":{
         "JOBS":[
            {
               "name":"software engineer",
               "description":"A software engineer is a person who applies the principles of software engineering to the design, development, maintenance, testing, and evaluation of the software and systems that make computers or anything containing software work.",
               "percent":"17",
               "jobLink":"https://collegegrad.com/careers/software-developers",
               "notable":"Ada Lovelace",
               "noteDescript":"Ada Lovelace is regarded as the first ever computer programmer.",
               "personLink":"https://en.wikipedia.org/wiki/Ada_Lovelace"
            },
            {
               "name":"politican",
               "description":"Politicians are key leaders and decision makers at every level of government. Becoming a politician in the United States allows a person to have a direct effect on many facets of life throughout our cities, states, and country.",
               "percent":"23",
               "jobLink":"http://www.politicalsciencecareer.com/politician.html",
               "notable":"Elizabeth Warren",
               "noteDescript":"She is a Professor from Harvard Law School who easily won the Senate seat of Massachusetts in 2012",
               "personLink":"https://en.wikipedia.org/wiki/Elizabeth_Warren"
            },
            {
               "name":"surgeon",
               "description":"A person who is professionally involved in politics, especially as a holder of or a candidate for an elected office.",
               "percent":"19",
               "jobLink":"https://collegegrad.com/careers/physicians-and-surgeons",
               "notable":"Dr. Emily Jennings Stowe",
               "noteDescript":"When she was told by the University of Canada that the doors never will be open for women, her reply was: Then I will make it the business of my life to see that the doors of Canadian Medical Schools will be opened and that women will have the same opportunities as men.",
               "personLink":"https://en.wikipedia.org/wiki/Emily_Stowe"
            },
            {
               "name":"civil engineer",
               "description":"Civil engineers design, build, supervise, operate, and maintain construction projects and systems in the public and private sector, including roads, buildings, airports, tunnels, dams, bridges, and systems for water supply and sewage treatment. Many civil engineers work in design, construction, research, and education.",
               "percent":"17.5",
               "jobLink":"https://collegegrad.com/careers/civil-engineers",
               "notable":"Emily Warren Roebling",
               "noteDescript":"She oversaw the construction of the Brooklyn Bridge and was considered as the first woman field engineer.",
               "personLink":"https://en.wikipedia.org/wiki/Emily_Warren_Roebling"
            },
            {
               "name":"movie director",
               "description":"In the motion picture industry, film directors are in charge of all creative decisions made in the production of a movie, from the beginning stages to the final edits.",
               "percent":"9",
               "jobLink":"http://study.com/career_as_a_film_director.html",
               "notable":"Kathryn Bigelow",
               "noteDescript":"Bigelow became the first woman to win the Academy Award for Best Director with her film, The Hurt Locker.",
               "personLink":"https://en.wikipedia.org/wiki/Kathryn_Bigelow"
            },
            {
               "name":"physicist",
               "description":"A physicist is someone who explores and identifies the basic principles that govern the structure and behaviour of matter, the interaction between energy and matter, and the generation and transfer of energy. These principals can be used in both theoretical and practical areas.",
               "percent":"20",
               "jobLink":"http://study.com/physicist_career.html",
               "notable":"Marie Curie",
               "noteDescript":"Marie Curie conducted pioneering research on radioactivity and also discovered two elements, polonium and radium.",
               "personLink":"https://en.wikipedia.org/wiki/Marie_Curie"
            },
            {
               "name":"electrical engineer",
               "description":"Electrical engineers specialize in power supply and generation. They design, develop, test and supervise electrical equipment manufacturing.",
               "percent":"10",
               "jobLink":"http://educatingengineers.com/careers/electrical-engineer",
               "notable":"Esther M. Conwell",
               "noteDescript":"Esther M. Conwell studied the properties of semiconductors and organic conductors, which helped lead to the creation of the modern computer",
               "personLink":"https://en.wikipedia.org/wiki/Esther_M._Conwell"
            },
            {
               "name":"aircraft pilot",
               "description":"Airline and commercial pilots fly and navigate airplanes, helicopters, and other aircraft. Airline pilots fly for airlines that transport people and cargo on a fixed schedule. Commercial pilots fly aircraft for other purposes, such as charter flights, rescue operations, firefighting, aerial photography, and aerial application, also known as crop dusting.",
               "percent":"5",
               "jobLink":"http://www.airaffair.com/Library/start-aviation-career.html",
               "notable":"Jacqueline Cochran",
               "noteDescript":"Jacqueline Cochran was a breaker of many flying records and even was the first woman to break the sound barrier.",
               "personLink":"https://en.wikipedia.org/wiki/Jacqueline_Cochran"
            }
         ],
         "SKILL_NAME":"Women Careers",
         "GET_RANDOM_MESSAGE":"Here's a random career: ",
         "HELP_MESSAGE":"You can say name a career, or, you can say exit... What can I help you with?",
         "HELP_REPROMPT":"What can I help you with?",
         "STOP_MESSAGE":"Goodbye!"
      }
   }
};

console.log(recipes);

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
        this.emit('GetRandom');
    },
    'RandomIntent': function () {
        //this.emit(':tell',"what is up?");
        this.emit('GetRandom');
    },
    'GetRandom': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var jobArr = this.t('JOBS');
        var jobIndex = Math.floor(Math.random() * jobArr.length);
        var randomJob = jobArr[jobIndex];

       // Create speech output
        var speechOutput = this.t("GET_RANDOM_MESSAGE") + randomJob.name+ "\n "+randomJob.description
                +"\n"+ randomJob.percentage +"percent of the industry is composed of women. A notable female " 
                            +randomJob.name+ " is "
                            +randomJob.notable +". \n"
                            +randomJob.noteDescript;
        var cardOutput =  randomJob.description+ " only " + randomJob.percent + "% are female.";
        //this.emit(':tell',speechOutput);
        this.emit(':tellWithCard', speechOutput, randomJob.name, cardOutput);
    },
    'CareerInfoIntent':function(intent, session, response){
	var recipes = this.t("JOBS");
	var recipe = "";
	var itemSlot = intent.slots.Item,
            itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

	for (var i = 0; i < recipes.length; i++) {
	    if (recipes[i] == itemName) {
		recipe = recipes[i];
	    }
	}

        var cardTitle = "Career Information for " + itemName,
            recipe,
            speechOutput,
            repromptOutput;
        if (recipe) {
            speechOutput = {
                speech: recipe,
                type: Alexa.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, recipe);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the recipe for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that job. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: Alexa.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: Alexa.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
	this.emit(':tell', intent);
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