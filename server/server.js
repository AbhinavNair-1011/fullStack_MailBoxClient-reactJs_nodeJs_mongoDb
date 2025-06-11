
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth");
const mailRoutes = require('./routes/mail');

app.use("/api", authRoute);
app.use('/api', mailRoutes);


module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  const MONGO_URI = process.env.MONGO_URI;

  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log(' MongoDB connected');
      app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection failed:', err);
      process.exit(1);
    });
}
