import path from "path";
import "dotenv/config";
import connectDB from "./config/db";
import express from "express";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import addressRoutes from "./routes/addressRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
const port = env.PORT || 3000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      sameSite: "none",
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }),
  })
);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: env.PAYPAL_CLIENT_ID });
});

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

if (env.NODE_ENV === "PRODUCTION") {
  const rootDirectory = path.join(__dirname, "..", "..", "client", "dist");
  app.use(express.static(rootDirectory));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(rootDirectory, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send(`Server is running in ${env.NODE_ENV}`);
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("Server running on port ", port));
