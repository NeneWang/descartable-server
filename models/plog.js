const mongoose = require('mongoose')


const pLogSchema = new mongoose.Schema({
    log: String,
    date: {
        Date,
        default: Date.now
    },
    id: String


});

module.exports = mongoose.model("plog", pLogSchema);