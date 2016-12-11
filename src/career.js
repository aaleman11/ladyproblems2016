var express = require("express");
var app = express();
var http = require("https");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var urlEncoded = bodyParser.urlencoded({extended: false});

var userId = "8xkgxhnwJJSVDfS";
var ApiToken = "8bi2H83KEOUB1Gw54Z7W83AF5/cIRkcGvo4WhZFbnly+hRIZlI5P907L1ufN4kOYVJ25sFnO9NL75kOhG8YyTg==";
var keyword = "software";
var location = "los angeles, ca";

var query = "https://api.careeronestop.org/v1/occupation/{" + userId + "}/{" + keyword + "}/{" + location + "}";

var options

http.get(query, userId,  function(res) {
    console.log(res);
}).on('error', function (e) {
    console.log("Got error: ${e.message}");
});