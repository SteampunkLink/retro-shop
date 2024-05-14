import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productCtrl";

import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getAllProducts).post(adminOnly, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getOneProduct)
  .patch(adminOnly, updateProduct)
  .delete(adminOnly, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);
export default router;
