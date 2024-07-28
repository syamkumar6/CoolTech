const mongoose = require("mongoose");

const StocksSchema = new mongoose.Schema({
    number:String,
    name: {
        type: String,
        require: true
    },
    date: String,
    day: String,
    qty: String,
    user: String
    
});

const Stocks = mongoose.model("Stocks", StocksSchema);

module.exports = Stocks;