import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../../App";
import toast from "react-hot-toast";

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 OPTIONAL: existing room data fetch (auto fill)
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${api}/rooms`, { withCredentials: true });

        const room = res.data.find(
          (r) => String(r.tournament._id) === String(id),
        );

        if (room) {
          setRoomId(room.roomId);
          setPassword(room.password);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRoom();
  }, [id]);

  // 🔥 UPDATE HANDLER
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(
        `${api}/rooms/tournament/${id}`,
        {
          roomId: roomId,
          password: password,
        },
        { withCredentials: true },
      );

      toast.success("Room updated successfully ✅");

      navigate("/desktop/matches");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">✏️ Update Room</h2>

      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 mb-3 w-full rounded"
      />

      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-3 w-full rounded"
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default UpdateRoom;
