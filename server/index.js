const express = require('express');
const app = express();
const PORT = 8797;
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const cafeRouter = require('/');

var mongoDB = "mongodb://localhost:27017/projectMongo;"
mongoose.connect(mongoDB, function(err) {
    if(err) throw err;
    console.log("connect to MongoDB successfully");
})
mongoose.Promise = global.Promise;

var db = mongoose.connection;

app.get("/", (req, res) => {
    res.send("hello");
});

db.on("error", console.error.bind(console, "Mongo connection error:"));

app.listen(PORT, () => {
    console.log("Server listening on port" + PORT);
})

module.exports = app;