const AssetLink = require('../Data/links');
const Watchlist = require('../Models/Watchlist');

module.exports.addToWatchList = async (req, resp) => {
    try {
        const { asset_name, asset_id } = req.body;
        const username = req.cookies.username;
        
        console.log("asset id", asset_id);
        console.log("asset name", asset_name);
        const asset_info = AssetLink.links[asset_id];
        console.log(username);
        let watchlist = await Watchlist.findOne({asset_id});
        if (!watchlist) {
            // console.log("username", username);
            console.log("asset info", asset_info);
            const newWatchlistItem = new Watchlist({ username, asset_id, asset_name, asset_info });
            const insertResult = await newWatchlistItem.save();
            return { message: 'Added to watchlist', insertedId: insertResult._id };
        } else {
            return { message: 'User does not exist or Data already exists' };
        }
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.getWatchList = async (req, resp) => {
    try {
        const username = req.cookies.username;
        console.log(username);
        const watchlist = await Watchlist.find({username});
        resp.status(200).json({ watchlist });
    }
    catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.deleteWatchList = async (req, resp) => {
    try {
        const { asset_id } = req.body;
        const username = req.cookies.username;
        console.log(username);
        console.log(asset_id);
        const watchlist = await Watchlist.findOneAndDelete({username, asset_id});
        console.log(watchlist);
        resp.status(200).json({ message: 'Deleted from watchlist' });
    }
    catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
}