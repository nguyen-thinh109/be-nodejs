const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const completeSchema = new Schema({
    task: {
        type: String,
        require: true
    }
}, { timestamps: true });

const Completed = mongoose.model('complete', completeSchema);

module.exports = Completed;