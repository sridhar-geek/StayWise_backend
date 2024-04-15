import express from "express";
const router = express.Router();

// Imports from anthor files
import { verifyAdmin } from "../Middleware/autherization.js";
import {
  createRoom,
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom,
} from "../Controllers/Rooms.js";

router
  .route("/:id")
  .get(getSingleRoom)
  .put(verifyAdmin, updateRoom)
  .delete(verifyAdmin, deleteRoom)

router.route("/").get(getAllRooms).post(verifyAdmin, createRoom)

export default router;
