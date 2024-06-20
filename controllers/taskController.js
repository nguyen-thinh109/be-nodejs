const crypto = require('crypto');
const fsPromises = require('fs').promises;
const path = require('path');

const pendingDB = {
  pendings: require('../models/pending.json'),
  setPendings: function (db) { this.pendings = db }
};

const completeDB = {
  completes: require('../models/completed.json'),
  setCompletes: function (db) { this.completes = db }
};

const redirectToPending = (req, res) => {
  res.redirect("/pending");
};

const showPendingTasks = (req, res) => {
  console.log('showPendingTasks', pendingDB.pendings);
  res.render("pending", { tasks: pendingDB.pendings });
};

const addPendingTask = async (req, res) => {
  try {
    let uuid = crypto.randomUUID();
  //store the new task
    const newPendingTask = {
      id: uuid,
      task: req.body.task
    };

    pendingDB.setPendings([...pendingDB.pendings, newPendingTask]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'pending.json'),
        JSON.stringify(pendingDB.pendings)
    );

    console.log('addPendingTask', req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

const deletePendingTask = async (req, res) => {
  try {
    //get the task
    const id = req.params.id;
    const index = pendingDB.pendings.findIndex(item => item.id == id);

    pendingDB.pendings.splice(index, 1);

    pendingDB.setPendings([...pendingDB.pendings]);

    console.log("deletePendingTask", id, 'at index', index);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'pending.json'),
        JSON.stringify(pendingDB.pendings)
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

const updateOnePendingTask = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTaskObj = req.body;
    console.log('update a pending task at', id, updatedTaskObj);

    const index = pendingDB.pendings.findIndex(item => item.id == id);

    pendingDB.pendings.splice(index, 1, updatedTaskObj);

    pendingDB.setPendings([...pendingDB.pendings]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'pending.json'),
        JSON.stringify(pendingDB.pendings)
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

const showCompletedTasks = (req, res) => {
  res.render("completed", { tasks: completeDB.completes });
};

const addCompletedTasks = async (req, res) => {
  console.log('addCompletedTasks', req.body);
  try {
    //Add completed task into list
    const newCompleteTask = {...req.body};

    completeDB.setCompletes([...completeDB.completes, newCompleteTask]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'completed.json'),
      JSON.stringify(completeDB.completes)
    );

    //Remove completed from pending
    const index = pendingDB.pendings.findIndex(item => item.id == req.body.id);

    pendingDB.pendings.splice(index, 1);

    pendingDB.setPendings([...pendingDB.pendings]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'pending.json'),
        JSON.stringify(pendingDB.pendings)
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCompletedTask = async (req, res) => {
  try {
    //get the task
    const id = req.params.id;
    const index = completeDB.completes.findIndex(item => item.id == id);

    completeDB.completes.splice(index, 1);

    completeDB.setCompletes([...completeDB.completes]);

    console.log("deleteCompletedTask", id, 'at index', index);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'completed.json'),
        JSON.stringify(completeDB.completes)
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

module.exports = {
  showPendingTasks,
  addPendingTask,
  deletePendingTask,
  showCompletedTasks,
  addCompletedTasks,
  deleteCompletedTask,
  redirectToPending,
  updateOnePendingTask
};
