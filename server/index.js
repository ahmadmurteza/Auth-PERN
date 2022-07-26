const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE //
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

// SERVER RUNNING //
app.listen(5000, () => {
    console.log("server running on port 5000");
});