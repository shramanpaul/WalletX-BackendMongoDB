const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const UserRoutes = require('./Routes/userRoutes')
dotenv.config()
require('./Config')
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})


const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(UserRoutes)