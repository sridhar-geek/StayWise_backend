import { StatusCodes } from "http-status-codes";
// Imports from another files
import { User } from "../Model/Users.js";
import NotFoundError from "../errors/not-found.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

// Update User
export const updateUser = async (req, res) => {
  if (req.params.id != req.user.id)
    throw new UnauthenticatedError(
      "Your not allowed to perform this operation"
    );
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(StatusCodes.OK).json(updatedUser);
};

// Get User
export const getSingleUser = async (req, res) => {
  if (req.params.id != req.user.id && !req.user.isAdmin)
    throw new UnauthenticatedError(
      "Your not allowed to perform this operation"
    );
  const user = await User.findById(req.params.id);
  if (user) return res.status(StatusCodes.OK).json(user);
  else throw new NotFoundError("User not found");
};

// Delete User
export const deleteUser = async (req, res) => {
  if (req.params.id != req.user.id && !req.user.isAdmin)
    throw new UnauthenticatedError(
      "Your not allowed to perform this operation"
    );
  await User.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json("User deleted Successful");
};

// Get All Users
export const getAllUsers = async (req, res) => {
  if (!req.user.isAdmin)
    throw new UnauthenticatedError(
      "Your not allowed to perform this operation"
    );
  const Users = await User.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ Users });
};
