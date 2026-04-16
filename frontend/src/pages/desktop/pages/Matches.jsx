import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTournaments } from "../../../redux/slices/tournamentSlice";
import { useNavigate } from "react-router-dom";

const Matches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tournaments } = useSelector((state) => state.tournament);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          🏆 Tournament Management
        </h1>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tournaments?.map((t) => {
          const isUpcoming = new Date(t.startTime) > new Date();

          return (
            <div
              key={t._id}
              className="bg-white rounded-2xl p-5 shadow-md border 
              hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-lg text-gray-800">{t.title}</h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    isUpcoming
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {isUpcoming ? "Upcoming" : "Live"}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {t.description}
              </p>

              {/* INFO GRID */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div className="bg-gray-50 p-2 rounded-lg">
                  💰 <span className="font-semibold">₹{t.entryFee}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  🏆 <span className="font-semibold">₹{t.prizePool}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  👥 <span className="font-semibold">{t.maxPlayers}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  🎮 <span className="font-semibold">{t.gameType}</span>
                </div>
              </div>

              {/* TIME */}
              <div className="mt-3 text-xs text-gray-500 flex justify-between">
                <span>⏰ Start</span>
                <span>{new Date(t.startTime).toLocaleString()}</span>
              </div>

              {/* ROOMS */}
              <div className="mt-4 border-t pt-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  🎯 Room Details
                </h3>

                {t.rooms?.length > 0 ? (
                  t.rooms.map((r, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center 
                      bg-linear-to-r from-gray-50 to-gray-100 
                      px-3 py-2 rounded-lg mb-2 border"
                    >
                      <div>
                        <p className="text-xs text-gray-500">Room ID</p>
                        <p className="font-semibold text-gray-800">
                          {r.roomId}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">Password</p>
                        <p className="font-semibold text-green-600">
                          {r.password}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No rooms created</p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                {t.rooms?.length > 0 ? (
                  <button
                    onClick={() => navigate(`/desktop/update-room/${t._id}`)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 
      text-white py-2.5 rounded-xl font-semibold transition"
                  >
                    ✏️ Update Room
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/desktop/create-room/${t._id}`)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 
      text-white py-2.5 rounded-xl font-semibold transition"
                  >
                    🔑 Create Room
                  </button>
                )}

                <button
                  className="px-4 bg-gray-200 hover:bg-gray-300 
    rounded-xl text-sm"
                >
                  👁 View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
