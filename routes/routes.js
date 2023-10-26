const express = require('express');
const router = express.Router();

const Pending = require("../models/pending");
const Completed = require("../models/completed");

//Pending tasks
router.get("/", (req, res) => {
    res.redirect("/pending");
});

router.get("/pending", (req, res) => {
    Pending.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("pending", { tasks: result });
        });
});

//Add new task
router.post("/pending", (req, res) => {
    const pending = new Pending(req.body);

    pending
        .save()
        .then((result) => {
            res.redirect('/pending')
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/add-task", (req, res) => {
    res.render("add-task");
});

//Delete pending tasks
router.delete("/pending/:id", (req, res) => {
    const id = req.params.id;
    console.log('delete', id)

    Pending.findByIdAndDelete(id).then((result) => {
        console.log('delete successful', id);
        //reload
        res.json({ reload: true }).redirect(301, 'pending');
    }).catch((err) => {
        console.log(err);
    });
});

//Completed tasks
router.get("/completed", (req, res) => {
    Completed.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("completed", { tasks: result });
        });
});

//Add new completed task
router.post("/completed", (req, res) => {
    console.log(req.body);
    const complete = new Completed(req.body);

    complete
        .save()
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

//Delete completed tasks
router.delete("/completed/:id", (req, res) => {
    const id = req.params.id;
    console.log('delete completed', id)

    Completed.findByIdAndDelete(id).then((result) => {
        console.log('delete successful', id);
        //redirect
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router