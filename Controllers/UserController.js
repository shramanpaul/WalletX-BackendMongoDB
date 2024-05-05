const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken')
const handleSignUpError = (err) => {
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

const handleLogInError = (err) => {
    let errors = { username: '', password: '' };
    if (err.message === 'User not found') {
        errors.username = err.message;
    } else if (err.message === 'Invalid password') {
        errors.password = err.message;
    }
    return errors;
}

const maxAge = 86400; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign(
        { id: id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: maxAge, }
    );
};

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
        errors = handleSignUpError(err)
        resp.status(500).send({errors});
    }
};

module.exports.loginUser = async (req, resp) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(user){
            const auth = await bcrypt.compare(password, user.password);
            if (auth){
                const token = createToken(user.user_id);
                resp.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                    secure: false, // set to true if your using https
                    sameSite: "none",
                });// Set the cookie
                resp.status(200).send({user: user._id, token: token});
            }else{
                throw new Error('Invalid password');
            }
        }else{
            throw new Error('User not found');
        }
    }catch(err){
        const errors = handleLogInError(err);
        resp.status(401).json({ errors });
    }
}

module.exports.logOutUser = (req, resp) => {
    resp.cookie('jwt', "", {
        httpOnly: true,
        maxAge: -1,
        secure: false, // set to true if your using https`
        sameSite: "none",
    });   //negative maxAge so that the cookie expires immediately
    resp.send('User logged out successfully')
}