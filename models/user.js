
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    tags: String,
    questsCompleted: Number,

});
const User = mongoose.model("User", userSchema);

