const {Router} = require('express')
const router = Router();
const ItemController = require('../Controllers/ItemController')

router.post('/watchlist',ItemController.addToWatchList);
router.get('/getwatchlist',ItemController.getWatchList);
router.delete('/deletewatchlist',ItemController.deleteWatchList);

module.exports = router;