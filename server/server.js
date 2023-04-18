const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModels");

const app = express();
app.use(express.json());

//routers
app.get("/", (req, res) => {
  res.send("welcome");
});

//find a product
app.get("/products", async (req, res) => {
  try {
    //   const { id } = req.params;
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//get certain product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a product
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messsage: error.message });
  }
});

// update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json("product update failed");
    }
    const updatedProduct = await Product.findById(id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messsage: error.message });
  }
});

//delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json("can not find any product with that id");
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ messsage: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:Ruona1029@mongo-test.xvjtiwi.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(8000, () => {
      console.log("server is running on port 8000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
