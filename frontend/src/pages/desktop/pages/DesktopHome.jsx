import React from "react";

const DesktopHome = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Cards */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Total Users</h3>
        <p className="text-2xl font-bold">1200</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Tournaments</h3>
        <p className="text-2xl font-bold">45</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Revenue</h3>
        <p className="text-2xl font-bold">₹50,000</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-gray-500">Active Matches</h3>
        <p className="text-2xl font-bold">10</p>
      </div>
    </div>
  );
};

export default DesktopHome;
