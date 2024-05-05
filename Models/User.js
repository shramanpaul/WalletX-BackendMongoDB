const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator'); 
const scheme = {
    username: {
        type: String,
        minlength: [4, 'Username must be atleast 4 characters long'],
        required: [true, 'Please enter a username'],
        unique: [true, 'Username already taken'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        minlength: [6, 'Password must be atleast 6 characters long'],
        required: [true, 'Please enter a password'],
    }
};
const userSchema = new mongoose.Schema(scheme);

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('Users', userSchema);
module.exports = User;