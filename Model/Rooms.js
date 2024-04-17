import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      unique: true
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: String,
    features: [String],
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export const Room = mongoose.model('Rooms', RoomSchema)