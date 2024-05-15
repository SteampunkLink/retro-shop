import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getAdminProductList,
  updateProductPublishStatus,
} from "../controllers/productCtrl";

import { protect, adminOnly } from "../middleware/authMiddleware";
import { checkObjectId } from "../middleware/errorMiddleware";

const router = express.Router();

router.route("/").get(getAllProducts).post(adminOnly, createProduct);
router.get("/top", getTopProducts);
router.get("/admin", adminOnly, getAdminProductList);
router
  .route("/:id")
  .get(checkObjectId, getOneProduct)
  .patch(checkObjectId, adminOnly, updateProduct)
  .delete(checkObjectId, adminOnly, deleteProduct);
router.route("/:id/reviews").post(checkObjectId, protect, createProductReview);
router.route("/:id/publish").patch(adminOnly, updateProductPublishStatus);
export default router;
