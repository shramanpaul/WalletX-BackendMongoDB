const { MongoClient } = require('mongodb');
const AssetLink = require('../../Data/links');


module.exports.addToWatchList = async (client, req, resp) => {
    try {
        const { asset_name, asset_id } = req.body;
        console.log("asset id", asset_id);
        console.log("asset name", asset_name);
        const asset_info = AssetLink.links[asset_id];

        const collection = client.db("wallet").collection("wallet");

        const user = await collection.findOne({ asset_id });
        if (!user) {
            console.log("asset info", asset_info);
            const insertResult = await collection.insertOne({  asset_id, asset_name, asset_info });
            return { message: 'Added to watchlist', insertedId: insertResult.insertedId };
        } else {
            return { message: 'Already added to watchlist' };
        }
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports.fetchWatchList = async (req, resp) => {
    try {

        const collection = client.db("wallet").collection("wallet"); // replace with your database and collection names

        const watchlist = await collection.find({}).toArray();
        return resp.status(200).json({ watchlist });
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}

module.exports.removeAsset = async (req, resp) => {
    try {
        const { asset_id } = req.params;
        const username = req.params.username; // assuming username is passed as a parameter

        await client.connect();
        const collection = client.db("wallet").collection("wallet"); // replace with your database and collection names

        await collection.deleteOne({ username, asset_id });
        return resp.status(200).json({ message: 'Asset removed' });
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}