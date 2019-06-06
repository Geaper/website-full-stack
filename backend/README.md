Flow 


Ler os issues da db
Loopar os issues
Na iteracao do issue, ver se existe duplicados
Se nao existir -> Insert na db (nnumber 1), calculated = true
Se existir, pegar do global stats com este start date e somar ao current issue, calculated = true





const GlobalStats = require('./models/GlobalStats');
const math = require('mathjs');

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

module.exports = {
    globalStats: function(db) {
        // Get only the distinct start dates
        db.collection("issues").find({}).toArray(function(err, result) {
            if (err) throw err;

            issues = result;

            issues = removeDuplicates(issues, "startDate");
    
            for(let i = 0; i < issues.length; i++) {
                let scores = [];
        
                let issue = issues[i];

                // Init vars
                let globalStats = {
                    numberOfTickets: 0,
                    meanScore: 0,
                    stDeviation: 0,
                    issues: []
                };

                globalStats.startDate = issue.startDate;
                if(issue.score != null) {
                    globalStats.scores.push(issue.score);
                }

                db.collection("globalStats").findOne({startDate : globalStats.startDate}, function(err, result) {

                    if (err) throw err;

                    // Update
                    if(result && !issue.calculated) {

                        let gs = result;

                        if(gs.scores.length > 0) {
                            gs.meanScore = math.mean(gs.scores);
                            gs.stDeviation = math.std(gs.scores);
                        }
                        gs.numberOfTickets++;

                        db.collection("globalStats").updateOne({"_id" : gs._id}, {$set: gs}, function(err, result) {
                            console.log("updated")

                            issue.calculated = true;
                            db.collection("issues").updateOne({"_id" : issue._id}, {$set: issue}, function(err, result) {

                            });
                        });
                    }
                    // Insert
                    else if(!result) {

                        globalStats.numberOfTickets = 1;

                        db.collection("globalStats").insertOne(globalStats, function(err, result) {
                            console.log("Inserted")

                            issue.calculated = true;
                            db.collection("issues").updateOne({"_id" : issue._id}, {$set: issue},{multi: true}, function(err, result) {

                            });
                        });
                    }
                });
            }
        });
    }
}