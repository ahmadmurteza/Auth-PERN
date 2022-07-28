require('dotenv').config({path: "./config.env"});
const express = require('express');
const pool = require("./config/db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE //
app.use(cors());
app.use(express.json());

// ROUTES //
app.use('/auth', require('./routes/authRoute'));

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});