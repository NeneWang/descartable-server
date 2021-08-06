const mongoose = require('mongoose')

const questSchema = new mongoose.Schema({
    questName: String,
    completed: Boolean,
    description: String,
    tags: String,
    questBoard: Number
});
const Quest = mongoose.model("Quest", questSchema);