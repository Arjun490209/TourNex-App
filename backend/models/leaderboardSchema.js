const leaderboardSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    totalKills: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    rank: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Leaderboard", leaderboardSchema);