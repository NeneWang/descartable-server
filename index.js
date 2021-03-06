const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require('./models/user.js');
const Quest = require('./models/quest.js');

const questboard = require('./routes/questboard');


// Express
const app = express();
let port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

app.use('/questboard', questboard);

app.get("/", (req, res) => {
    res.status = 200;
    res.send("Welcome to Descartable API")
});

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
})