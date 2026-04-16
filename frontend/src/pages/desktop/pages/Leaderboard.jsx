import React from "react";

const Leaderboard = () => {
  const players = [
    { id: 1, name: "Arjun", kills: 10, points: 25 },
    { id: 2, name: "Rohit", kills: 8, points: 20 },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Leaderboard</h1>

      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full text-center">
          <thead>
            <tr className="border-b">
              <th>Rank</th>
              <th>Name</th>
              <th>Kills</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {players.map((p, i) => (
              <tr key={p.id} className="border-b">
                <td className="font-bold">#{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.kills}</td>
                <td>{p.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
