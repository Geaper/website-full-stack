var mongoose = require("mongoose");

let schema = mongoose.Schema({
    startDate: String,
    numberOfTickets : Number,
    priorityLowMean: Number,
    priorityNormalMean: Number,
    priorityHighMean: Number
});

module.exports = mongoose.model("GlobalStats", schema);