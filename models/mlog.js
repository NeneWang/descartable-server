const mongoose = require('mongoose')


const mlogSchema = new mongoose.Schema({
    log: String,
    date: {
        Date,
        default: Date.now
    },
    id: String


});

module.exports = mongoose.model("mlog", mlogSchema);