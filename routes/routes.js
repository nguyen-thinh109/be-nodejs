const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

//Display pending tasks
router.get("/", taskController.redirectToPending);

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

module.exports = router