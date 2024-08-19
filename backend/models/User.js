const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    password: { type: String, required: true } 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
