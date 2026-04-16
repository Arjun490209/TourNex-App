import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiAdminFill,
  RiDashboardFill,
  RiUser3Fill,
  RiTrophyFill,
  RiSettings3Fill,
  RiLogoutBoxRLine,
  RiGamepadFill,
  RiBarChartFill,
  RiWallet3Fill,
  RiNotification3Fill,
  RiCustomerService2Fill,
} from "react-icons/ri";

const Sidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/desktop",
      icon: <RiDashboardFill />,
    },
    {
      name: "Users",
      path: "/desktop/users",
      icon: <RiUser3Fill />,
    },
    {
      name: "Tournaments",
      path: "/desktop/tournaments",
      icon: <RiTrophyFill />,
    },

    // 🔥 NEW PAGES ADD
    {
      name: "Matches",
      path: "/desktop/matches",
      icon: <RiGamepadFill />,
    },
    {
      name: "Leaderboard",
      path: "/desktop/leaderboard",
      icon: <RiBarChartFill />,
    },
    {
      name: "Wallet",
      path: "/desktop/wallet",
      icon: <RiWallet3Fill />,
    },

    // ⚙️ LAST (Settings always last)
    {
      name: "Settings",
      path: "/desktop/settings",
      icon: <RiSettings3Fill />,
    },
  ];
  return (
    <div className=" relative w-64 h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white p-5 shadow-lg">
      {/* Logo */}
      <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
        <RiAdminFill className="text-sky-400 text-2xl" />
        Admin Panel
      </h1>

      {/* Menu */}
      <ul className="space-y-2">
        {menu.map((item, i) => {
          const isActive = pathname === item.path;

          return (
            <li key={i}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-orange-500 shadow-md"
                    : "hover:bg-slate-700 hover:pl-4"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bottom Section */}
      <div className="absolute bottom-5 left-0 w-full px-5">
        <button
          className="flex items-center justify-center gap-2 w-full 
    bg-red-500 hover:bg-red-600 active:scale-95 
    transition-all duration-200 
    py-2.5 rounded-xl text-white font-medium shadow-md"
        >
          <RiLogoutBoxRLine className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
