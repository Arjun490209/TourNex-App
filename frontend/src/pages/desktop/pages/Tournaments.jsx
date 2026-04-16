import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTournament } from "../../../redux/slices/tournamentSlice";
import { toast } from "react-hot-toast";

const Tournament = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    entryFee: "",
    prizePool: "",
    maxPlayers: "",
    gameType: "kill_based",
    startTime: "",
  });

  const [prizes, setPrizes] = useState([]);

  // 🔄 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // 🔥 Reset prizes when game type changes
    if (name === "gameType") {
      if (value === "kill_based") {
        setPrizes([{ position: "per kill", amount: "" }]);
      } else {
        setPrizes([
          { position: "1st", amount: "" },
          { position: "2nd", amount: "" },
          { position: "3rd", amount: "" },
        ]);
      }
    }
  };

  // ➕ Add more rank prizes
  const addPrize = () => {
    setPrizes([...prizes, { position: `${prizes.length + 1}th`, amount: "" }]);
  };

  // ✏️ Update prize
  const handlePrizeChange = (index, field, value) => {
    const updated = [...prizes];
    updated[index][field] = value;
    setPrizes(updated);
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createTournament({ ...form, prizes })).unwrap();
      toast.success("Tournament Created ✅");

      setForm({
        title: "",
        description: "",
        entryFee: "",
        prizePool: "",
        maxPlayers: "",
        gameType: "kill_based",
        startTime: "",
      });

      setPrizes([]);
    } catch (err) {
      toast.error("Error creating tournament");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🎮 Create Tournament
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          {/* INPUTS */}
          {[
            { name: "title", placeholder: "Tournament Title" },
            { name: "description", placeholder: "Description" },
            { name: "entryFee", placeholder: "Entry Fee", type: "number" },
            { name: "prizePool", placeholder: "Prize Pool", type: "number" },
            { name: "maxPlayers", placeholder: "Max Players", type: "number" },
          ].map((field, i) => (
            <input
              key={i}
              name={field.name}
              type={field.type || "text"}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
            />
          ))}

          {/* TIME */}
          <input
            name="startTime"
            type="datetime-local"
            value={form.startTime}
            onChange={handleChange}
            className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* GAME TYPE */}
          <select
            name="gameType"
            value={form.gameType}
            onChange={handleChange}
            className="border px-4 py-2 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="kill_based">🔥 Kill Based</option>
            <option value="rank_based">🏆 Rank Based</option>
          </select>

          {/* 🎯 PRIZE SECTION */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              🎁 Prize Distribution
            </h3>

            {prizes.map((p, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={p.position}
                  disabled={form.gameType === "kill_based"} // lock for kill
                  onChange={(e) =>
                    handlePrizeChange(i, "position", e.target.value)
                  }
                  className="border px-3 py-2 rounded-xl w-1/3"
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={p.amount}
                  onChange={(e) =>
                    handlePrizeChange(i, "amount", e.target.value)
                  }
                  className="border px-3 py-2 rounded-xl w-2/3"
                />
              </div>
            ))}

            {/* ➕ Add button only for rank */}
            {form.gameType === "rank_based" && (
              <button
                type="button"
                onClick={addPrize}
                className="text-blue-500 text-sm mt-1"
              >
                + Add More Rank
              </button>
            )}
          </div>

          {/* BUTTON */}
          <button className="md:col-span-2 bg-linear-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition">
            🚀 Create Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tournament;
