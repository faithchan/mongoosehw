const express = require('express')
const db = require("./connectDB")
const app =express();
const productsController = require('./controllers/productsController')
require("dotenv").config()
const connectDB = require('./connectDB')
const PORT = process.env.PORT || 7000

app.listen(PORT, ()=>console.log('success'))
app.use(express.urlencoded({ extended: false }))
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(express.json())
app.use(productsController)

module.exports=app
