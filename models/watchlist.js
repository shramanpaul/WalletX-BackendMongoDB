const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    asset_id: {
        type: String,
        required: true,
        unique: true
    },
    asset_name: String,
    asset_info: String
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);