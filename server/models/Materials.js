const mongoose = require("mongoose");

const MarerialsSchema = new mongoose.Schema({
    number:String,
    name: {
        type: String,
        require: true
    },
    date: String,
    day: String,
    qty: String,
    author: String,
    status:{
        type: Boolean,
        default: false
    }
});

const Marerials = mongoose.model("Marerials", MarerialsSchema);

module.exports = Marerials;