const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    number:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default:"user",
        enum: ["user", "author"] 
    }
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;