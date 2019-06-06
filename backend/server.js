var express = require('express');
var app = express();
app.use(express.static('public')); // public is the static content
var bodyParser = require('body-parser');
var request = require("request");
var cors = require('cors');
app.use(cors());

var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

let GlobalStats = require('./models/GlobalStats');
let statisticsThread = require("./statisticsThread");

let uiBaseURL = "http://localhost:3000";

// Email transporter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'spamppcout@gmail.com',
        pass: '@Barcelos19'
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

    setInterval(function () {
        statisticsThread.globalStats(db);
    }, 1000);

    var requestLoop = setInterval(function () {
        let url = apiBaseURL + "/api/v1/issues?after=" + new Date("05 October 2011 14:48 UTC").toISOString() + "&limit=1";
        request({
            url: url,
            method: "GET"
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                let issues = JSON.parse(body).issues;

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
                                    issue.startDate = issue.start_date.substring(0, 10);

                                    db.collection("users").updateOne({"_id": user.id}, {$set: user}, {upsert: true, multi: true}).then(result => {
                                        //const { matchedCount, modifiedCount } = result;
                                        //console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} users.`)
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });
        
                                    db.collection("issues").updateOne({"_id": issue.id}, {$set: issue}, {upsert: true}).then(result => {
                                        const { matchedCount , modifiedCount } = result;
                                                                                                         
                                        //console.log(result);
                                        //console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} issues.`)
                                        // Parse by @ -> Project@Client
                                        let splitName = issue.project.name.split("@");
                                        let product = splitName[0].split("|")[1].trim();
                                        let client = splitName[1].trim();
    
                                        // Send email for each user
                                        let body = "<html><head> <meta charset=\"UTF-8\"> <title>Inqu\u00E9rito de Satisfa\u00E7\u00E3o</title> <!-- Font Awesome Icon Library --> <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> <style> .title { text-align: center; font-family: Arial, Helvetica, sans-serif; } #presentation { /*border-style: solid;*/ width: 50%; margin-right: auto; margin-left: auto; } #name { font-style: italic; font-weight: bold; } .req_details { /*border-style: solid;*/ width: 50%; margin-right: auto; margin-left: auto; } #client, #product, #subject, #timestamp, #operator { color: red; font-weight: bold; } .inq { /*border-style: solid;*/ width: 30%; margin-right: auto; margin-left: auto; padding-right: 10%; text-align: right; } .links { color: black; text-decoration: none; } .checked { color: orange; } #goodbye { text-align: right; margin-right: 10%; } </style></head><body> <h1 class=\"title\">Inqu\u00E9rio de Satisfa\u00E7\u00E3o - Sistema de Gest\u00E3o de Qualidade</h1> </br> <div id=\"presentation\"> <p>Caro(a) <span id=\"name\">" + user.firstname + " " + user.lastname + "</span>,</p> <p>este inqu\u00E9rito visa avaliar a qualidade do servi\u00E7o de apoio ao cliente da nossa empresa - <b>JIBS</b>,</p> <p>tendo por base a sua experi\u00EAncia no \u00E2mbito dos diferentes contactos feitos com os nossos servi\u00E7os,</p> <p>relativamente ao seguinte pedido:</p> </div> </br> <div class=\"req_details\"> <p><span id=\"client\">Cliente: </span>" + client + "</p> <p><span id=\"product\">Produto: </span>" + product + "</p> <p><span id=\"subject\">Assunto: </span>" + issue.subject + "</p> <p><span id=\"timestamp\">Data e Hora da submiss\u00E3o: </span>" + issue.start_date + "</p> <p><span id=\"operator\">Ticket atendido pelo operador: </span>" + issue.id + "</p> </div> </br></br> <h3 class=\"title\">Por favor indique o seu grau de satisfa\u00E7\u00E3o, </br>relativamente \u00E0 resolu\u00E7\u00E3o do ticket mencionado anteriormente:</h3> </br> <div class=\"inq\"> <div id=sat1><a href=\"" + uiBaseURL + "/submission?issueId=" + issue.id + "&score=1\" class=\"links\">Totalmente insatisfeito: <span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span></a></div> </br> <div id=sat2><a href=\"" + uiBaseURL + "/submission?issueId=" + issue.id + "&score=2\" class=\"links\">Insatisfeito: <span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span></a></div> </br> <div id=sat3><a href=\"" + uiBaseURL + "/submission?issueId=" + issue.id + "&score=3\" class=\"links\">Nem insatisfeito nem satisfeito: <span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span><span class=\"fa fa-star\"></span></a></div> </br> <div id=sat4><a href=\"" + uiBaseURL + "/submission?issueId=" + issue.id + "&score=4\" class=\"links\">Satisfeito:<span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span></a></div> </br> <div id=sat5><a href=\"" + uiBaseURL + "/submission?issueId=" + issue.id + "&score=5\" class=\"links\">Totalmente satisfeito: <span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span></a></div> </br> </div> </br> <div id=\"goodbye\"> <p>Obrigado pela colabora\u00E7\u00E3o,</br> os melhores cumprimentos,</br>departamento de qualidade da JIBS.</p> </div></body></p></html>";
    
                                        var mailOptions = {
                                            from: 'spamppcin@gmail.com',
                                            to: 'spamppcin@gmail.com',
                                            subject: issue.id + ' - Inquérito de Satisfação',
                                            html: body
                                        };
    
                                        /*
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        });
                                        */
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });
                                }
                            }
                        }   
                    }
                });
            }
            else {
                console.log('error' + response.statusCode);
            }
        });
    }, 1000);

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

// Endpoint that gets the evaluation of the user
app.get("/evaluation/:id", function(req, res) {
    let issueId = Number(req.params.id);
    let score = Number(req.query.score);

    db.collection("issues").findOne({"_id": issueId}).then(result => {
        if(result) {
            //Check if score exists
            if(!result.score) {
                db.collection("issues").updateOne({"id": issueId}, {$set: {"score": score}},{multi: true}).then(result => {
                    console.log("Score updated. Issue -> " + issueId);
                    res.send({});

                  
                    
                    // insert global statistics in the db
                    db.collection("globalStats").insertMany().then(result => {
                        let globalStats = new GlobalStats({
                            numberOfTickets: score
                        });
                        
                    })
                    .error(error => {
                        console.error(error);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
            }
            else {
                console.log("Score already exists");
                res.status(500).send({ error: "Already evaluated"});
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
});
