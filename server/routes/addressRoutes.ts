import express from "express";
import {
  createAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/addressCtrl";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getUserAddresses).post(protect, createAddress);
router
  .route("/:id")
  .get(protect, getAddressById)
  .patch(protect, updateAddress)
  .delete(protect, deleteAddress);

export default router;
