const express = require('express')
const app =express();
const productsController = require('./controllers/productsController')
require("dotenv").config()

app.use(express.urlencoded({ extended: false }))
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(express.json())
app.use("/api", productsController)

module.exports=app
