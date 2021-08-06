const mongoose = require('mongoose')

const questSchema = new mongoose.Schema({
    questName: String,
    completed: Boolean,
    description: String,
    tags: String,
    questBoard: Number
});



module.exports = mongoose.model("Quest", questSchema);