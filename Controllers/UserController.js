const mongoose = require('mongoose');
const User = require('../Models/User');

const handleError = (err) => {
    let error = {
        username: "",
        email: "",
        password: "",
    };
    if (err.code === 11000){
        if (err.keyValue.email){
            error.email = "Email already taken";
        }else if(err.keyValue.username){
            error.username = "Username already taken";
        }
    }
    else if(err.errors.username)
        error.username = err.errors.username.message;
    else if(err.errors.password)
        error.password = err.errors.password.message
    else if(err.errors.email)
        error.email = "Please enter a valid email";
    return error;
}

module.exports.getAllUsers = async(req, resp) => {
    try{
        let result = await User.find();
        resp.send(result);
    }catch(err){
        resp.send("UserModel error");
    }
}

module.exports.createUser = async(req, resp) => {
    try{
        const {username, password, email} = req.body;
        let user = new User({username, password, email});
        user = await user.save();
        resp.json(user);
    }catch(err){
        errors = handleError(err)
        resp.status(500).send({errors});
    }
};
