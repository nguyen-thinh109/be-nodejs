const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const signInController = require('../controllers/signInController');
const signOutController = require('../controllers/signOutController');
const errorController = require('../controllers/errorController');

router.get("/", signInController.redirect);

//Display sign-in page
router.get("/sign-in", signInController.showSignInPage);

//Send sign-in info
router.post("/sign-in", signInController.signIn);

//Display sign-up page
router.get("/sign-up", signInController.showSignUpPage);

//Send sign-up info
router.post("/sign-up", signInController.signUp);

//Display pending tasks
router.get("/pending", taskController.showPendingTasks);

//Add new task
router.post("/pending", taskController.addPendingTask);

//Delete pending tasks
router.delete("/pending/:id", taskController.deletePendingTask);

//Update a pending task
router.put("/pending/:id", taskController.updateOnePendingTask);

//Display completed tasks
router.get("/completed", taskController.showCompletedTasks);

//Add new completed task
router.post("/completed", taskController.addCompletedTasks);

//Alter a completed task into a pending one
router.post("/revert", taskController.revertCompletedTasks);

//Delete completed tasks
router.delete("/completed/:id", taskController.deleteCompletedTask);

//Sign-out
router.post("/sign-out", signOutController.signOut);

//Unauthorize
router.get("/unauthorized", errorController.unauthorized);

//notFound
router.get("/notFound", errorController.notFound);

module.exports = router