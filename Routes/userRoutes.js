const {Router} = require('express')
const router = Router();
const UserController = require('../Controllers/UserController')

router.get('/users', UserController.getAllUsers);

router.post('/signup', UserController.createUser);

module.exports = router;