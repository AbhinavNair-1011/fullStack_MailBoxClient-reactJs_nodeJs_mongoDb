
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth");
const mailRoutes = require('./routes/mail');

app.use("/api", authRoute);
app.use('/api', mailRoutes);


module.exports = app;