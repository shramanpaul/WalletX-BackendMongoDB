const {Router} = require('express')
const router = Router();
const ItemController = require('../Controllers/ItemController')

router.post('/watchlist',ItemController.addToWatchList);

module.exports = router;