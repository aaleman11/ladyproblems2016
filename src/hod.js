var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var havenOnDemand = require("havenondemand");
var apiKey = "61034e79-eb06-412c-b99c-de9fb28c3e80";
var client = new havenOnDemand.HODClient(apiKey);

app.use(bodyParser.json() );

app.use(express.static(__dirname + "/public") );

var callback = function(err, resp, body) {
    console.log(body);
};
var data = {"text": "I hate cats!"};

client.post("analyzesentiment", data, false, callback);