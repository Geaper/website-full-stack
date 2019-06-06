Flow 


Ler os issues da db
Loopar os issues
Na iteracao do issue, ver se existe duplicados
Se nao existir -> Insert na db (nnumber 1), calculated = true
Se existir, pegar do global stats com este start date e somar ao current issue, calculated = true





const GlobalStats = require('./models/GlobalStats');
const math = require('mathjs');

module.exports = {
    globalStats: function(db) {
        // Get only the distinct start dates
        db.collection("issues").find({}).toArray(function(err, result) {
            if (err) throw err;

            issues = result;
    
            for(let i = 0; i < issues.length; i++) {
                let scores = [];

                let issue = issues[i];
                
                // Get the issues with the same start date as the current obj
                db.collection("issues").find({startDate: issue.startDate, _id : {$ne: issue._id}}).toArray(function(err, result) {

                    // Init vars
                    let globalStats = {
                        numberOfTickets: 0,
                        meanScore: 0,
                        stDeviation: 0
                    };

                    globalStats.startDate = issue.startDate;

                    let similarIssues = result;

                    if(similarIssues != null) {
                        for(let j = 0; j < similarIssues.length; j++) {
                            let similarIssue = similarIssues[j];
                            globalStats.numberOfTickets = similarIssues.length;

                            if(issue.score != null) {
                                let score = Number(similarIssue.score);
                                scores.push(score);
                            }
                        }

                        if(scores.length > 0) {
                            globalStats.stDeviation = math.std(scores);
                            globalStats.meanScore = math.mean(scores);
                        }          
                        console.log(globalStats);



                            db.collection("globalStats").findOne({startDate : globalStats.startDate}, function(err, result) {
                                if (err) throw err;

                                // Update
                                if(result != null && !issue.calculated) {
                                    let gs = result;
                                    
                                    gs.numberOfTickets++;
                                    gs.meanScore += Number(globalStats.meanScore);


                                    db.collection("globalStats").updateOne({"_id" : result._id}, {$set: gs},{multi: true}, function(err, result) {
                                        issue.calculated = true;
                        
                                        db.collection("issues").updateOne({"_id" : issue._id}, {$set : issue}, function(error, result) {

                                        });
                                    });
                                }
                                // Insert
                                else if(!result) {
                                    gs.numberOfTickets = 1;
                                    issue.calculated = true;
                                    db.collection("globalStats").insertOne(gs, function(err, result) {
                                        if(err) throw err;

                                        db.collection("issues").updateOne({"_id" : issue._id}, {$set : issue}, function(error, result) {

                                        });
                                    });
                                }
                        });
                    }
                });
            }
        });
    }
}