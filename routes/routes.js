const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const signInController = require('../controllers/signInController');
const signOutController = require('../controllers/signOutController');


router.get("/", signInController.redirect);

//Display sign-in
router.get("/sign-in", signInController.showSignInPage);

//Display pending tasks
router.get("/pending", taskController.showPendingTasks);

//Add new task
router.post("/pending", taskController.addPendingTask);

router.get("/add-task", taskController.showAddTaskForm);

//Delete pending tasks
router.delete("/pending/:id", taskController.deletePendingTask);

//Display completed tasks
router.get("/completed", taskController.showCompletedTasks);

//Add new completed task
router.post("/completed", taskController.addCompletedTasks);

//Delete completed tasks
router.delete("/completed/:id", taskController.deleteCompletedTask);

//Sign-out
router.post("/sign-out", signOutController.signOut);

module.exports = router