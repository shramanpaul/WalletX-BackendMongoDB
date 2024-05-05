const {Router} = require('express');
const ItemController = require('../controllers/items');
const router = Router();

//Item Routes
router.post('/watchlist', ItemController.addToWatchList);
router.get('/watchlist', ItemController.fetchWatchList);
router.delete('/watchlist/:asset_id', ItemController.removeAsset);
module.exports = router;