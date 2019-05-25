var express = require('express');
var app = express();
app.use(express.static('public')); // public is the static content
var bodyParser = require('body-parser');
var request = require("request");

const apiBaseURL = "https://redmine-mock-api.herokuapp.com"

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});

// This responds with "Hello World" on the homepage
app.get('/users', function (req, res) {
    request({
        url: apiBaseURL + "/api/v1/users",
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
 });

 var requestLoop = setInterval(function() {
    console.log("GETTING ISSUES...");
    let url = apiBaseURL + "/api/v1/issues?after=" + new Date("05 October 2011 14:48 UTC").toISOString();
    console.log(url);
    request({
        url: url,
        method: "GET"
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            let users = getUsers();
        }
        else{
            console.log('error' + response.statusCode);
        }
    });
  }, 1000);

  var getUsers = function() {
      console.log("GETTING USERS...");
      request({
        url: apiBaseURL + "/api/v1/users?forceMail=tiagox23@hotmail.com",
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            return body;
        }
    });
  }

