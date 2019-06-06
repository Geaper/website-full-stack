

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

                // Init vars
                let globalStats = {
                    numberOfTickets: 0,
                    meanScore: 0,
                    stDeviation: 0,
                    issues: [],
                    totalScores : 0
                };

                globalStats.startDate = issue.startDate;

                db.collection("globalStats").findOne({startDate : globalStats.startDate}, function(err, result) {

                    if (err) throw err;

                    if(result) {
                        let gs = result;

                        if(gs.issues.indexOf(issue._id) == -1) {
                            gs.issues.push(issue._id);
                        }
                        
                            let foundIssues = [];
                            for(let j = 0; j < gs.issues.length; j++) {
                                db.collection("issues").findOne({_id : gs.issues[j]}, function(err, result) {
                                    if(result) {
                                        foundIssues.push(result);
                                        if(gs.issues.indexOf(issue._id) == -1) {
                                            gs.numberOfTickets++;
                                        }

                                        let scores = [];
                                        for(let k = 0; k < foundIssues.length; k++) {
                                            let foundIssue = foundIssues[k];
            
                                            if(foundIssue.score) {
                                                scores.push(foundIssue.score);
                                                gs.totalScores++;
                                            }
                                        }
            
                                        if(scores.length > 0) {
                                            gs.stDeviation = math.std(scores);
                                            gs.meanScore = math.mean(scores);
                                        }
            
                                        db.collection("globalStats").updateOne({"_id" : gs._id}, {$set: gs}, function(err, result) {
                                        });
                                    }
                                });
                            }
                    }
                    else {
                        globalStats.numberOfTickets = 1;
                        globalStats.issues.push(issue._id);

                        db.collection("globalStats").insertOne(globalStats, function(err, result) {
                        });
                    }
                });
            }
        });
    }
}