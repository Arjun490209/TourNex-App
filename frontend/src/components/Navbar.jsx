import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("home");
  return (
    <div className="w-full bg-slate-300 px-2 sm:px-6 md:px-10  flex items-center justify-between">
      <div className="w-16 h-16 flex justify-center items-center">
        <Link to={"/"}>
          <img
            src={logo}
            className="w-full drop-shadow-2xl drop-shadow-amber-100 "
            alt="logo"
          />
        </Link>
      </div>
      <ul className="flex justify-center items-center gap-3">
        <li
          onClick={() => {
            setActive("home");
          }}
          className={`${active === "home" ? "font-semibold text-orange-600 bg-amber-50 px-2 py-0.5 rounded" : ""} hover:underline hover:text-orange-500 transition-all duration-200`}
        >
          <Link to={"/"}>Home</Link>
        </li>
        <li
          onClick={() => {
            setActive("contact");
          }}
          className={`${active === "contact" ? "font-semibold text-orange-600 bg-amber-50 px-2 py-0.5 rounded" : ""} hover:underline hover:text-orange-500 transition-all duration-200`}
        >
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li
          onClick={() => {
            setActive("about");
          }}
          className={`${active === "about" ? "font-semibold text-orange-600 bg-amber-50 px-2 py-0.5 rounded" : ""} hover:underline hover:text-orange-500 transition-all duration-200`}
        >
          <Link to={"/about"}>About</Link>
        </li>
        <li
          onClick={() => {
            setActive("terms");
          }}
          className={`${active === "terms" ? "font-semibold text-orange-600 bg-amber-50 px-2 py-0.5 rounded" : ""} hover:underline hover:text-orange-500 transition-all duration-200`}
        >
          <Link to={"/terms"}>Terms</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
