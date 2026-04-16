import axios from "axios";
import React, { useEffect } from "react";
import {
  RiSearchLine,
  RiNotification3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { api } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logoutUser } from "../../../redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/admin");
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200">
      {/* 🔥 LEFT */}
      <div className="flex items-center gap-5 w-full max-w-xl">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-full focus-within:ring-2 focus-within:ring-orange-400 transition">
          <RiSearchLine className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search users, tournaments..."
            className="bg-transparent w-full text-sm outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* 🔥 RIGHT */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative cursor-pointer group">
          <RiNotification3Line className="text-2xl text-gray-600 group-hover:text-orange-500 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="admin"
            className="w-9 h-9 rounded-full border border-gray-300"
          />
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.role || "Super Admin"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition active:scale-95"
        >
          <RiLogoutBoxRLine />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
