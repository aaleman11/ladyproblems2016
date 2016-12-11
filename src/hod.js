var express = require("express");
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");

var havenOnDemand = require("havenondemand");
var apiKey = "61034e79-eb06-412c-b99c-de9fb28c3e80";
var client = new havenOnDemand.HODClient(apiKey);

app.use(bodyParser.json() );

app.use(express.static(__dirname + "/public") );

var callback = function(err, resp, body) {
    console.log(body);
};

//var txt = req.body["Body"];
var data1 = {"text": "I hate cats!"};

var data2 = {"text":data1, entity_type:["places_eng", "people_eng", "companies_eng", "organizations"]};

client.post("analyzesentiment", data1, false, callback);

client.get("analyzesentiment", data2, false, function(err, resp, body) {
    if(!err) {
	console.log(resp.body);
    }
    
});