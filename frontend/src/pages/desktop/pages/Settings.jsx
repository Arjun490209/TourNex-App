import React from "react";

const Settings = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Settings</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        {/* App Name */}
        <div>
          <label className="block text-sm mb-1">App Name</label>
          <input
            type="text"
            placeholder="FF Tournament"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Entry Limit */}
        <div>
          <label className="block text-sm mb-1">Default Entry Fee</label>
          <input type="number" className="w-full border p-2 rounded" />
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between">
          <span>Enable Registration</span>
          <input type="checkbox" />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
