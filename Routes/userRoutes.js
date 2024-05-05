const {Router} = require('express')
const router = Router();
const UserController = require('../Controllers/UserController');
const { verifyUser } = require('../MiddleWares/Auth');

router.get('/users', verifyUser, UserController.getAllUsers);

router.post('/signup', UserController.createUser);

router.post('/login', UserController.loginUser);

router.get('/logout', UserController.logOutUser)

module.exports = router;