import express from "express";
import {
  createOrder,
  getUserOrders,
  getUserOrderById,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderCtrl";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(adminOnly, getOrders).post(protect, createOrder);
router.get("/myorders", protect, getUserOrders);
router.route("/myorders/:id").get(protect, getUserOrderById);
router.route("/:id").get(adminOnly, getOrderById);
router.route("/:id/pay").patch(protect, updateOrderToPaid);
router.route("/:id/delivered").patch(adminOnly, updateOrderToDelivered);

export default router;
