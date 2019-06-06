

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
                    stDeviation: 0
                };

                globalStats.startDate = issue.startDate;
                globalStats.stDeviation = 0;
                globalStats.meanScore = issue.score;

                db.collection("globalStats").findOne({startDate : globalStats.startDate}, function(err, result) {

                    if (err) throw err;

                    // Update
                    if(result && issue.calculated == false) {

                        console.log(issue.calculated);
                        console.log(issue._id);

                        globalStats.numberOfTickets = result.numberOfTickets + 1;

                        db.collection("globalStats").updateOne({"_id" : result._id}, {$set: globalStats},{multi: true}, function(err, result) {
                            console.log("updated")

                            issue.calculated = true;
                            db.collection("issues").updateOne({"_id" : issue._id}, {$set: issue},{multi: true}, function(err, result) {

                            });
                        });
                    }
                    // Insert
                    else {

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