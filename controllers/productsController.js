const express = require("express");
require("dotenv").config();
const router = express.Router();
const newProducts = require("../models/seed.js");
const Product = require("../models/products.js");

router.get("/", (req, res) => {
  res.send("ok")
});

router.get("/seed", async (req, res) => {
  const check = await Product.find();
  if (check.length === 0) {
    console.log("collection empty, data added");
    try {
      const seedItems = await Product.create(newProducts);
      res.send(seedItems);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    console.log("not added");
    res.send("failed request");
  }
});

router.get("/product", async (req, res) => {
  try {
    const allItems = await Product.find({});
    res.render("index.ejs", { data: allItems });
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/product/new", (req, res) => {
  res.render("new.ejs", {});
});

router.post("/product/new", async (req, res) => {
  await Product.create(req.body);

  res.redirect("/product/");
});

router.put("/product/:index/buy", async (req, res) => {
  const index = req.params.index;

  await Product.updateOne({ _id: index }, { $inc: { qty: -1 } });

  res.redirect("/product/" + index);
});

router.delete("/product/:index", async (req, res) => {
  const index = req.params.index;
  await Product.deleteOne({ _id: req.params.index });

  res.redirect("/product");
});

router.get("/product/:index", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.index });
  console.log(product);
  res.render("show.ejs", {
    data: product,
  });
});

router.get("/product/:index/edit", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.index });
  console.log(product);
  res.render("edit.ejs", {
    data: product,
  });
});

router.put("/product/:index", async (req, res) => {
  await Product.findOneAndUpdate({ _id: req.params.index }, { $set: req.body });
  res.redirect("/product/" + req.params.index);
});

module.exports = router;