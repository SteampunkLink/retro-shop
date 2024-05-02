import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productCtrl";

import { adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getAllProducts).post(adminOnly, createProduct);
router
  .route("/:id")
  .get(getOneProduct)
  .patch(adminOnly, updateProduct)
  .delete(adminOnly, deleteProduct);

export default router;
