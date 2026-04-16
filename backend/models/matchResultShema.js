const matchResultSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },

    results: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },

        kills: Number,
        position: Number,
        points: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("MatchResult", matchResultSchema);