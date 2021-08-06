
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: String,
    tags: String,
    questsCompleted: Number,

});

module.exports =  mongoose.model("User", userSchema);

