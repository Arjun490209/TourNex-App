import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    roomId: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "waiting", 
    },
  },
  { timestamps: true },
);

export default mongoose.model("Room", roomSchema);
