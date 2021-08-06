const express = require("express");
let router = express.Router();


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://nelson:1223@cluster0.kzhr5.mongodb.net/questBoard?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


const User = require('../models/user.js');
const Quest = require('../models/quest.js');


router.get("/", (req, res) => {
    res.status = 200;
    res.send("Welcome to Questboard API v1.3")
});


router.get("/users", async (req, res) => {

    const adqUsers = await User.find({}).exec();
    res.status = 200;
    res.json(adqUsers);
})

router.get("/users/:username", async (req, res) => {
    const username = req.params.username;
    console.log(`Retrieving ${username} data`);
    const adqUsers = await User.findOne({
        username
    })

    if (adqUsers) {
        res.json(adqUsers);
    } else {
        res.status(404);
        res.json({message: `User ${username} not found`});
    }


});


router.post("/users", async (req, res) => {
    const {
        username,
        tags,
        questsCompleted
    } = req.body;
    const user = await User.findOne({
        username
    }).exec();
    if (user) {
        user.tags = tags;
        user.questsCompleted = questsCompleted;
        user.save();
        res.json({
            message: "User updated",
            user: user
        });
    } else {
        const newUser = await User.create({
            username,
            tags,
            questsCompleted
        });
        res.json({
            message: "user created",
            user: newUser
        });
    }

});

router.get("/quests", async (req, res) => {

    const adqQuests = await Quest.find({}).exec();
    res.send(adqQuests);
});

router.get("/quests/:o_id", async (req, res) => {
    const {
        o_id
    } = req.params;
    const adqQuest = await Quest.findById(o_id)

    if (adqQuest) {
        res.json(adqQuest);
    } else {
        res.status(404);
        res.send(`Quest ${o_id} not found`);
    }


});

router.delete("/quests/:o_id", async (req, res) => {
    const {
        o_id
    } = req.params;
    Quest.findByIdAndRemove(o_id, (err, data) => {
        if (!err) {
            res.status(200)
            res.json({
                message: `Deleted quest with ID: ${o_id}`
            });
        } else {
            res.status(404);
            res.json({
                message: `Error deleting quest`
            });
        }
    });



})


router.post("/quests", async (req, res) => {
    const {
        o_id,
        questName,
        completed,
        description,
        tags,
        questBoard,
    } = req.body;
    const quest = await Quest.findById(o_id)

    if (quest) {
        quest.questName = questName;
        quest.completed = completed;
        quest.description = description;
        quest.tags = tags;
        quest.questBoard = questBoard;
        quest.save();
        res.json({
            message: "Quest updated",
            quest: quest
        });
    } else {
        const newQuest = await Quest.create({
            questName,
            completed,
            description,
            tags,
            questBoard,
        });
        res.json({
            message: "quest created",
            quest: newQuest
        });
    }
})

router.post("/new-quest", async (req, res) => {
    const {
        questName,
        description,
        tags,
        questBoard,
    } = req.body;

    const completed = false;
    const newQuest = await Quest.create({
        questName,
        completed,
        description,
        tags,
        questBoard,
    });
    res.json({
        message: "quest created",
        quest: newQuest
    });

});

router.post("/complete-quest", async (req, res) => {
    const {
        o_id,
        username
    } = req.body;

    const quest = await Quest.findById(o_id)

    const user = await User.findOne({
        username
    })


    if (quest && user) {

        quest.completed = true
        user.questsCompleted++;

        await quest.save();
        await user.save();


        res.json({
            message: `Quest id: ${o_id} Completed by ${username}`,
            user: user,
            quest: quest
        });
    }else{
        res.status = 404;
        res.json({
            message: `Quest with id: ${o_id} or User with username: ${username} not found`
        })
    }




});

module.exports = router;



