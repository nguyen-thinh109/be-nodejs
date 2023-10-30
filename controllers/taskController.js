const Pending = require("../models/pending");
const Completed = require("../models/completed");

const showAddTaskForm = (req, res) => {
  res.render("add-task");
};

const showPendingTasks = (req, res) => {
  Pending.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("pending", { tasks: result });
    });
};

const addPendingTask = (req, res) => {
  const pending = new Pending(req.body);
  const isUndoCompleted = req?.action == "UNSELECT";
  console.log(req.body)
  
  pending
    .save()
    .then((result) => {
      if (isUndoCompleted) {
        res.json({ success: true, isRedirectRequired: false });
      } else {
        res.json({ success: true, isRedirectRequired: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deletePendingTask = (req, res) => {
  const id = req.params.id;
  console.log("delete", id);

  Pending.findByIdAndDelete(id)
    .then((result) => {
      res.json({ success: true });
    })
    .catch((err) => console.log(err));
};

const showCompletedTasks = (req, res) => {
  Completed.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("completed", { tasks: result });
    });
};

const addCompletedTasks = (req, res) => {
    console.log(req.body);
    const complete = new Completed(req.body);

    complete
        .save()
        .then((result) => {
            console.log(result);
            res.json({success : true});
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteCompletedTask = (req, res) => {
    const id = req.params.id;
    console.log('delete completed', id)

    Completed.findByIdAndDelete(id).then((result) => {
        console.log('delete successful', id);
        //redirect
        res.json({success : true});
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = {
  showAddTaskForm,
  showPendingTasks,
  addPendingTask,
  deletePendingTask,
  showCompletedTasks,
  addCompletedTasks,
  deleteCompletedTask
};
