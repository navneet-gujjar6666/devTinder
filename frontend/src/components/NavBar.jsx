import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constatnts";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";

const NavBar = () => {
  const kya = useSelector((store) => store.user);
  //This is a HOOK used for taking data from user stored in the redux store after loggIn
  //CONCEPT: if in first no data in redux store so kya: null, but if data came after some time in redux store, so in that .jsx
  //         which uses useSelector(); so that file code will re-render as STATE is changed of redux store data earlier null to
  //         now data, so like withOut useEffect(); the useSelector(); is working same like useEffect();
  console.log("fromUser: ", kya);

  const dispatch = useDispatch();
  const navJi = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout2",
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(clearFeed());
      dispatch(removeUser());
      return navJi("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const [jao, setJao] = useState(false);
  const handleJao = () => {
    setJao(true);
    setTimeout(() => {
      setJao(false);
    }, 2500);
  };

  return (
    <div
      className="
      navbar mb-10 h-16
      bg-gradient-to-r from-[#1a0f14] via-[#2a141c] to-[#1a0f14]
      border-b border-white/10
      shadow-xl
      px-6 z-[999]
    "
    >
      {/* LEFT: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="
          relative text-2xl font-extrabold tracking-wider
          bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
          bg-clip-text text-transparent
          after:content-['']
          after:absolute after:inset-0
          after:bg-gradient-to-r
          after:from-transparent after:via-white/40 after:to-transparent
          after:-translate-x-full
          hover:after:translate-x-full
          after:transition-transform after:duration-700
          drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
        "
        >
          DevTinder
        </Link>
      </div>

      {/* RIGHT: Search + User */}
      <div
        className="
        flex items-center gap-4
        bg-white/5 backdrop-blur-lg
        px-4 py-2 rounded-full
        border border-white/10
        shadow-md
      "
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="
          input input-bordered
          h-9 w-40 md:w-56
          bg-black/40 text-white placeholder-gray-400
          border-white/20
          focus:border-amber-500 focus:ring-1 focus:ring-amber-500
          rounded-full
          transition-all duration-300
        "
        />

        {/* User dropdown */}
        {kya && (
          <div className="dropdown dropdown-end relative flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <p className="text-xs text-gray-400">Welcome</p>
              <p className="text-sm font-semibold text-white">
                {kya.firstName} {kya.lastName}
              </p>
            </div>

            {/* Avatar button */}
            <div
              onClick={() => {
                handleJao();
              }}
              tabIndex={0}
              role="button"
              className="
        btn btn-ghost btn-circle avatar
        hover:scale-105 transition-transform
        ring-2 ring-amber-500/40
      "
            >
              <div className="w-10 rounded-full">
                <img alt="User photo" src={kya.photoUrl} />
              </div>
            </div>

            {/* Dropdown menu */}
            {jao && (
              <ul
                tabIndex={0}
                className="
        dropdown-content
        absolute right-0 top-full mt-3
        menu menu-sm w-52
        bg-[#1f1116]
        backdrop-blur-xl
        rounded-2xl
        border border-white/10
        shadow-2xl
        p-2
        z-50 text-red-600
      "
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile <span className="badge badge-warning">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                 <li>
                  <Link to="/">Make Friends</Link>
                </li>
                <li className="text-red-700">
                  <a onClick={handleLogout} className="text-red-400">
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
