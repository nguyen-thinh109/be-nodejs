const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userInfoSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Minimum pasword length is 8 characters']
    },
    phoneNumber: {
        type: String,
        required: [false, 'Please enter your phone number']
    },
    email: {
        type: String,
        required: [false, 'Please enter your email'],
        lowercase: true,
        validate: [isEmail, 'Please enter an valid email'],
        unique: true
    },
}, { timestamps: true });

const UserInfo = mongoose.model('userInfo', userInfoSchema);

module.exports = UserInfo;