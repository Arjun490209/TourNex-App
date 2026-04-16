import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/slices/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // 🔥 FILTER LOGIC
  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "all" ? true : u.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (
    <div className="p-4">
      {/* 🔥 HEADER */}

      <div className="mb-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Users Management 👥
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all players, workers and admins
            </p>
          </div>

          {/* Right */}
          <div className="flex gap-2 flex-wrap">
            {/* 🔍 Search */}
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-xl outline-none 
                   focus:ring-2 focus:ring-orange-400 
                   focus:border-orange-400 
                   focus:outline-none 
                   shadow-sm transition"
            />

            {/* 🎯 Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border px-4 py-2 rounded-xl outline-none 
                   focus:ring-2 focus:ring-orange-400 
                   focus:border-orange-400 
                   shadow-sm transition"
            >
              <option value="all">All</option>
              <option value="worker">Worker</option>
              <option value="player">Player</option>
            </select>
          </div>
        </div>

        {/* 🔥 STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="text-xs text-gray-500">Total</p>
            <h2 className="text-xl font-bold text-gray-800">{users.length}</h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="text-xs text-gray-500">Admins</p>
            <h2 className="text-xl font-bold text-purple-600">
              {users.filter((u) => u.role === "admin").length}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="text-xs text-gray-500">Workers</p>
            <h2 className="text-xl font-bold text-yellow-600">
              {users.filter((u) => u.role === "worker").length}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="text-xs text-gray-500">Players</p>
            <h2 className="text-xl font-bold text-green-600">
              {users.filter((u) => u.role === "player").length}
            </h2>
          </div>
        </div>
      </div>

      {/* 🔥 CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        {loading && (
          <p className="text-center text-gray-500">Loading users...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No users found</p>
        )}

        {!loading && filteredUsers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              {/* HEADER */}
              <thead>
                <tr className="border-b text-gray-600 text-sm">
                  <th className="py-3">User</th>
                  <th>Email</th>
                  <th>Game UID</th>
                  <th>Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* USER */}
                    <td className="py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </td>

                    {/* EMAIL */}
                    <td className="text-gray-600">{user.email}</td>

                    {/* GAME UID */}
                    <td className="text-gray-600">{user.gameUID}</td>

                    {/* ROLE */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-600"
                            : user.role === "worker"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="text-center space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
