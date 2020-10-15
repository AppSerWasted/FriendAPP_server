const mongoose = require('mongoose');

//Create Schema

const userSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
        min: 3,
        max:200
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max:200
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:1000
    },
    phone: {
        type: String,
        required: true,
        min: 6,
        max:200
    },
    date: {
        type: Date,
        default: Date.now
    },
    dateOfLastEnter: {
      type: Date,
      default: Date.now
    },
});



module.exports = mongoose.model('User', userSchema);
