import express from "express";
const router = express.Router();

// Imports from anthor files
import {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} from "../Controllers/Users.js";

router
  .route("/:id")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);
router.route("/").get(getAllUsers)

export default router;
