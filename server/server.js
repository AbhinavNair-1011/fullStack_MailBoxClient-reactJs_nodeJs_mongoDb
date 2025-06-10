const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser= require("cookie-parser");
require('dotenv').config();

const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true, 
}));
app.use(express.json());
app.use(cookieParser())

const authRoute= require("./routes/auth");

app.use("/api", authRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() =>{
console.log('MongoDB connected');
app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.log(err));

