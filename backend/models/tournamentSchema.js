import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    gameType: {
      type: String,
      enum: ["kill_based", "rank_based"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    createdByRole: {
      type: String,
      enum: ["admin", "worker"],
    },

    entryFee: Number,
    prizePool: Number,

    // ✅ Direct prizes (NO separate schema)
    prizes: [
      {
        position: String,
        amount: Number,
      },
    ],

    // ✅ Direct winners
    winners: [
      {
        position: String, // "1st"
        rank: Number, // 1,2,3
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        prize: Number,
      },
    ],

    maxPlayers: Number,

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },

    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    startTime: Date,

    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Tournament", tournamentSchema);
