const {Router} = require('express')
const router = Router();
const ItemController = require('../Controllers/ItemController');
const { verifyUser } = require('../MiddleWares/Auth');

router.post('/watchlist', verifyUser, ItemController.addToWatchList);
router.get('/getwatchlist',verifyUser, ItemController.getWatchList);
router.delete('/deletewatchlist', verifyUser, ItemController.deleteWatchList);

module.exports = router;