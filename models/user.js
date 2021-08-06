
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://nelson:1223@cluster0.kzhr5.mongodb.net/questBoard?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    tags: String,
    questsCompleted: Number,

});

module.exports =  mongoose.model("User", userSchema);

