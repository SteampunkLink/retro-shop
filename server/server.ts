import "dotenv/config";
import connectDB from "./config/db";
import express from "express";
import env from "./utils/validateEnv";
import productRoutes from "./routes/productRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
const port = env.PORT || 3000;

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("Server running on port ", port));
