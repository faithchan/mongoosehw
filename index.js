const express = require("express");
const app = require("./app");
const mongoose = require('mongoose');
require('dotenv').config();

const db = mongoose.connection
const PORT = process.env.PORT || 7000;
const DATABASE = process.env.DATABASE;
const USER = process.env.MONGO_USER
const PASSWORD = process.env.MONGO_PASSWORD
const BASE =process.env.MONGO_BASEURI
const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${BASE}/${DATABASE}?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL).then(()=>{

    app.listen(PORT, async () => {
        console.log('Listening on ' + PORT)
    })
}) 
db.on("connected", () => console.log("mongo successfully connected on: ", MONGO_URL));