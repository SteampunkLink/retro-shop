import express from "express";
import { getAllProducts, getOneProduct } from "../controllers/productCtrl";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getOneProduct);

export default router;
