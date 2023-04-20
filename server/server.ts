import express, { Express, Request, Response } from "express"
import mongoose from "mongoose"
import Product, { IProduct } from "./models/productModels"

const app: Express = express();
app.use(express.json());

//routers
app.get("/", (req, res) => {
  res.send("welcome");
});

//find a product
app.get("/products", async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.find({});
    res.status(200).json(products);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//get certain product
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product: IProduct | null = await Product.findById(id);
    res.status(200).json(product);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//create a product
app.post("/products", async (req: Request, res: Response) => {
  try {
    const product: IProduct = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a product
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product: IProduct | null = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json("Product update failed");
    }
    const updatedProduct: IProduct | null = await Product.findById(id);
    return res.status(200).json(updatedProduct);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//delete a product
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product: IProduct | null = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json("Can not find any product with that id");
    }
    return res.status(200).json(product);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
