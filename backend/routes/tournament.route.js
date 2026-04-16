import express from "express";
import {
  createRoom,
  createTournament,
  getRooms,
  getTournamentDetails,
  getTournaments,
  joinTournament,
  updateRoom,
  updateRoomByTournament,
} from "../controller/tournament.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// 🔥 TOURNAMENT ROUTES
router.post("/tournaments", protect, createTournament);
router.get("/tournaments", protect, getTournaments);

// 🔥 ROOM ROUTES
router.post("/rooms", protect, createRoom);
router.get("/rooms", protect, getRooms);

// 🔥 NEW UPDATE ROUTES
router.put("/rooms/:roomId", protect, updateRoom);
router.put("/rooms/tournament/:tournamentId", protect, updateRoomByTournament);

// join tournament route will be in match.route.js since it involves both tournament and match logic
router.post("/tournaments/:tournamentId/join", protect, joinTournament);
router.get("/tournaments/:id", protect, getTournamentDetails);

export default router;
