import "dotenv/config";
import express from "express";
import productData from "./data/toy-data";
import env from "./utils/validateEnv";
const port = env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(productData);
});

app.get("/api/products/:id", (req, res) => {
  const product = productData.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => console.log("Server running on port ", port));
