import { Room } from "../Model/Rooms.js";
import NotFoundError from "../errors/not-found.js";
import { StatusCodes } from "http-status-codes";


export const createRoom = async (req, res) => {
  const newRoom =  await Room.create(req.body)
    res.status(StatusCodes.CREATED).json(newRoom)
};

export const updateRoom = async (req, res) => {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedRoom);
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};


export const deleteRoom = async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("Room has been deleted.");

};
export const getSingleRoom = async (req, res) => {
    const room = await Room.findById(req.params.id);
    res.status(StatusCodes.OK).json(room);
};

export const getAllRooms = async (req, res) => {
    const rooms = await Room.find();
    res.status(StatusCodes.OK).json(rooms);
};
