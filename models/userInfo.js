const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
}, { timestamps: true });

const UserInfo = mongoose.model('userInfo', userInfoSchema);

module.exports = UserInfo;