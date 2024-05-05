const mongoose = require('mongoose');

const scheme = {
    username: {
        type: String,
        unique: false,
    },
    asset_id:{
        type: String,
    },
    asset_name:{
        type: String,
    },
    asset_info:{
        type: String,
    }
};
const watchlistSchema = new mongoose.Schema(scheme);


const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;