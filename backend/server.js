var express = require('express');
var app = express();
app.use(express.static('public')); // public is the static content
var bodyParser = require('body-parser');
var request = require("request");
var cors = require('cors');
app.use(cors());

var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

// Email transporter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tiagogeaper@gmail.com',
        pass: 'xxx'
    },
    tls: { rejectUnauthorized: false }
});


// DB Connection
mongoose.connect('mongodb://localhost/webdb', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.on('open', () => {
    console.log("Connected to Database");

    /*
    var requestLoop = setInterval(function () {
        console.log("GETTING ISSUES...");
        let url = apiBaseURL + "/api/v1/issues?after=" + new Date("05 October 2011 14:48 UTC").toISOString() + "&limit=1";
        console.log(url);
        request({
            url: url,
            method: "GET"
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                let issues = JSON.parse(body).issues;

                console.log("GETTING USERS...");
                request({
                    url: apiBaseURL + "/api/v1/users?forceMail=tiago.geaper@gmail.com",
                    method: "GET"
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        let users = JSON.parse(body);

                        // Replace author by the user
                        for (let i = 0; i < issues.length; i++) {
                            let issue = issues[i];

                            for (let j = 0; j < users.length; j++) {
                                let user = users[j];

                                if (issue.author.id == user.id) {
                                    issue.author = user;
                                }
                            }
                        }

                        db.collection("users").insertMany(users, function (error, response) {
                            if (error) throw error;
                            console.log("Number of users inserted: " + response.insertedCount);
                            db.close();
                        });

                        db.collection("issues").insertMany(issues, function (error, response) {
                            if (error) throw error;
                            console.log("Number of issues inserted: " + response.insertedCount);
                            db.close();


                            var mailOptions = {
                                from: 'tiagogeaper@gmail.com',
                                to: 'tiagogeaper@gmail.com',
                                subject: 'Sending Email using Node.js',
                                text: 'That was easy!'
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });

                        });
                    }
                });
            }
            else {
                console.log('error' + response.statusCode);
            }
        });
    }, 10000);
    */

});


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
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
});

// Total helpdesk items
app.get("/globalIndicators", function(req, res) {
    let globalIndicators = {};


    db.collection("issues").find({}).toArray(function(err, result) {
        if(err) throw err;
        let issues = result;

        issues.forEach(function(issue) {
            if(issue.closed_on && issue.created_on) {
                var diff = Math.abs(new Date(issue.closed_on) - new Date(issue.created_on));
                var minutes = Math.floor((diff/1000)/60);
                
                if(!isNaN(minutes)) {
                    console.log(minutes);
                    globalIndicators.responseDiferencial += minutes;
                }
                
            }
        });
        globalIndicators.responseDiferencial /= issues.length;
      
        globalIndicators.issuesSize = issues.length;
        res.send(globalIndicators);
    });

    /*
    db.collection("issues").count({}, function(error, numOfIssues) {
        globalIndicators.issuesSize = numOfIssues;
        res.send(globalIndicators);
    });
    */
});
