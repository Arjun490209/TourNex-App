import Tournament from "../models/tournamentSchema.js";
import Room from "../models/roomSchema.js";

// 🔥 CREATE TOURNAMENT
export const createTournament = async (req, res) => {
  try {
    const {
      title,
      description,
      entryFee,
      prizePool,
      maxPlayers,
      gameType,
      prizes,
      startTime,
    } = req.body;

    // ✅ convert numbers safely
    const entry = Number(entryFee);
    const prize = Number(prizePool);
    const max = Number(maxPlayers);

    // ❌ better validation
    if (
      !title ||
      !description ||
      isNaN(entry) ||
      isNaN(prize) ||
      isNaN(max) ||
      !startTime
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const tournament = await Tournament.create({
      title,
      description,
      entryFee: entry,
      prizePool: prize,
      maxPlayers: max,
      gameType,
      prizes,
      startTime,
      createdBy: req.user?.id,
      createdByRole: req.user?.role,
    });

    res.status(201).json({
      message: "Tournament created",
      tournament,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 GET ALL TOURNAMENTS
export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find()
      .populate("rooms") // ✅ rooms bhi aa jayenge
      .sort({ createdAt: -1 });

    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 CREATE ROOM
export const createRoom = async (req, res) => {
  try {
    const { tournamentId, roomId, password } = req.body;

    if (!tournamentId || !roomId || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ❌ check tournament exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // ❌ duplicate room check
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: "Room already exists" });
    }

    // ✅ create room
    const room = await Room.create({
      tournament: tournamentId,
      roomId,
      password,
    });

    // ✅ add room to tournament
    tournament.rooms.push(room._id);
    await tournament.save();

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 GET ROOMS (with tournament info)
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("tournament", "title startTime") // ✅ useful data
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 UPDATE ROOM
export const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { newRoomId, password } = req.body;

    // ❌ validation
    if (!newRoomId || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ❌ check room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ❌ check duplicate roomId
    if (newRoomId !== room.roomId) {
      const existingRoom = await Room.findOne({ roomId: newRoomId });
      if (existingRoom) {
        return res.status(400).json({ message: "Room ID already exists" });
      }
    }

    // ✅ update
    room.roomId = newRoomId;
    room.password = password;

    await room.save();

    res.json({
      message: "Room updated successfully",
      room,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 UPDATE ROOM BY TOURNAMENT ID
export const updateRoomByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { roomId, password } = req.body;

    const room = await Room.findOne({ tournament: tournamentId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.roomId = roomId || room.roomId;
    room.password = password || room.password;

    await room.save();

    res.json({
      message: "Room updated successfully",
      room,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joinTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user.id;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // ❌ already joined check
    const alreadyJoined = tournament.participants.find(
      (p) => String(p.user) === String(userId),
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: "Already joined" });
    }

    // ❌ max players check
    if (tournament.participants.length >= tournament.maxPlayers) {
      return res.status(400).json({ message: "Tournament full" });
    }

    // ✅ join
    tournament.participants.push({ user: userId });
    await tournament.save();

    res.json({ message: "Joined successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTournamentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findById(id).populate("rooms");

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
