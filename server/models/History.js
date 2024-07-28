const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    number:String,
    name: {
        type: String,
        require: true
    },
    date: String,
    day: String,
    qty: String,
});

const History = mongoose.model("History", HistorySchema);

module.exports = History;