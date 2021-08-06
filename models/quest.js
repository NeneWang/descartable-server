const mongoose = require('mongoose')

const questSchema = new mongoose.Schema({
    questName: String,
    completed: Boolean,
    description: String,
    tags: String,
    questBoard: Number
});
mongoose.connect("mongodb+srv://nelson:1223@cluster0.kzhr5.mongodb.net/questBoard?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


module.exports = mongoose.model("Quest", questSchema);