import express from "express";
import {
  userLogin,
  userRegister,
  userLogout,
  userProfile,
  userProfileUpdate,
  adminGetAllProfiles,
  adminGetOneProfile,
  adminUpdateOneProfile,
  adminDeleteOneProfile,
} from "../controllers/userCtrl";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(adminOnly, adminGetAllProfiles).post(userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router
  .route("/profile")
  .get(protect, userProfile)
  .patch(protect, userProfileUpdate);
router
  .route("/:id")
  .get(adminOnly, adminGetOneProfile)
  .patch(adminOnly, adminUpdateOneProfile)
  .delete(adminOnly, adminDeleteOneProfile);

export default router;
