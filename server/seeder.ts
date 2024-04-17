import "dotenv/config";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import userData from "./data/users";
import productData from "./data/products";
import User from "./models/userModel";
import Product from "./models/productModel";
import Order from "./models/orderModel";
import connectDB from "./config/db";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(userData);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = productData.map((prod) => {
      return { ...prod, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log("Data failed to load.");
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.log("Data failed to erase.");
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
