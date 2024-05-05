const {Router} = require('express')
const router = Router();
const UserController = require('../Controllers/UserController')
const ItemController = require('../Controllers/ItemController')

router.get('/users', UserController.getAllUsers);

router.post('/signup', UserController.createUser);

router.post('/watchlist',ItemController.addToWatchList);

module.exports = router;