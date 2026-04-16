import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Matches = () => {
  const { id } = useParams(); // ✅ tournamentId
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomId: "",
    password: "",
  });

  const rooms = [
    { id: 1, roomId: "12345", password: "abc123", status: "waiting" },
  ];

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      tournamentId: id,
      roomId: room.roomId,
      password: room.password,
    };

    try {
      const res = await axios.post(`${api}/rooms`, data, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Room created successfully");
      navigate("/desktop/matches");
    } catch (error) {
      toast.error("Failed to create room");
    }

    console.log("Room Create Data:", data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Match Rooms</h1>

      {/* Create Room */}
      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded-xl shadow mb-6 space-y-3"
      >
        <input
          name="roomId"
          placeholder="Room ID"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Create Room
        </button>
      </form>

      {/* Room List */}
      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>Room ID</th>
              <th>Password</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-b text-center">
                <td>{r.roomId}</td>
                <td>{r.password}</td>
                <td className="text-green-500">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Matches;
