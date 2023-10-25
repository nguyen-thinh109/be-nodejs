const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingSchema = new Schema({
    task: {
        type: String,
        require: true
    }
}, { timestamps: true });

const Pending = mongoose.model('pending', pendingSchema);

module.exports = Pending;