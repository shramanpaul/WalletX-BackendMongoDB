const port = 3001;
const uri = "mongodb+srv://shraman1:Shraman123@cluster0.6iq3qcf.mongodb.net/wallet?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());

// CORS setup
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('An error occurred');
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(() => {
  
  app.post('/watchlist', async (req, res) => {
    try {
      const result = await addToWatchList(client, req, res);
      res.send(result);
    } catch (err) {
      console.dir(err);
      res.status(500).send("An error occurred while adding to watchlist.");
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});