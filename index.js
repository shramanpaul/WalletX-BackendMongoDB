const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const UserRoutes = require('./Routes/userRoutes')
const ItemRoutes = require('./Routes/itemRoutes')
const app = express();
dotenv.config()
require('./Config')

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ["set-cookie"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(UserRoutes)
app.use(ItemRoutes)