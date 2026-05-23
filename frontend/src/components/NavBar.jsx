import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constatnts";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import ji2 from "../backgroundImages/ronaldoProfile.webp";
import UserCard from "./UserCard";

const NavBar = () => {
  const kya = useSelector((store) => store.user);
  //This is a HOOK used for taking data from user stored in the redux store after loggIn
  //CONCEPT: if in first no data in redux store so kya: null, but if data came after some time in redux store, so in that .jsx
  //         which uses useSelector(); so that file code will re-render as STATE is changed of redux store data earlier null to
  //         now data, so like withOut useEffect(); the useSelector(); is working same like useEffect();
  // console.log("fromUser: ", kya);

  const dispatch = useDispatch();
  const navJi = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleProfile = (user) => {
    setShow(false);
    setSearch("");
    navJi("/selected", { state: user });
  };

  const [jao, setJao] = useState(false);
  const handleJao = () => {
    setJao(true);
    setTimeout(() => {
      setJao(false);
    }, 2500);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search) {
        setResults([]);
        return;
      }

      const res = await axios.get(BASE_URL + "/search?name=" + search);

      setResults(res.data);
      setShow(true);
    }, 300); //for stoping searching after every keystroke, search should re-search after .3 secs

    return () => clearTimeout(timer);
  }, [search]);

return (
  <>
    <div
      className="
        navbar mb-6 sm:mb-10
        min-h-16 relative
        bg-gradient-to-r from-[#1a0f14] via-[#2a141c] to-[#1a0f14]
        border-b border-white/10
        shadow-xl
        px-3 sm:px-6
        py-2
        z-[999]
        flex flex-wrap gap-3
      "
    >
      {/* LEFT: Logo */}
      <div className="flex-1 min-w-fit">
        <Link
          to="/"
          className="
            relative
            text-xl sm:text-2xl
            font-extrabold
            tracking-wide sm:tracking-wider
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
      {kya && (
        <div
          className="
            flex items-center gap-2 sm:gap-4
            bg-white/5 backdrop-blur-lg
            px-2 sm:px-4 py-2
            rounded-full
            border border-white/10
            shadow-md
            w-full sm:w-auto
            justify-between sm:justify-normal
          "
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShow(true)}
            onBlur={() => {
                setTimeout(() => {
                  setShow(false);
                }, 200);
              }}
            className="
              input input-bordered
              h-9
              w-[45vw] sm:w-40 md:w-56
              bg-black/40 text-white placeholder-gray-400
              border-white/20
              focus:border-amber-500 focus:ring-1 focus:ring-amber-500
              rounded-full
              transition-all duration-300
              text-sm
            "
          />

          {/* User dropdown */}
          <div className="dropdown dropdown-end relative flex items-center gap-2 sm:gap-3">
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
              <div className="w-9 sm:w-10 rounded-full">
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
                  menu menu-sm
                  w-44 sm:w-52
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
                  <Link to="/premium">Update Plan</Link>
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
        </div>
      )}

      {/* Search Results */}
      {show && (
        <div
          className="
            bg-gradient-to-r from-[#1a0f14] via-[#2a141c] to-[#1a0f14]
            rounded-xl
            shadow-lg
            w-[92vw] sm:w-[260px]
            absolute
            top-28 sm:top-16
            right-2 sm:right-6
            overflow-hidden
            border border-gray-700
            z-[999]
          "
        >
          {results.map((user, index) => (
            <div
              key={user._id}
              onClick={() => handleProfile(user)}
              className={`
                p-3 border-b border-gray-700
                cursor-pointer flex items-center gap-3
                transition-all duration-300
                
                ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-500/30 to-amber-500/20 scale-[1.02] shadow-lg border-yellow-400"
                    : "text-yellow-500 hover:bg-[#3a1d28]"
                }
              `}
            >
              {/* Profile Image */}
              <div
                className={`
                  w-10 h-10 sm:w-12 sm:h-12
                  rounded-full overflow-hidden
                  flex-shrink-0 border
                  
                  ${
                    index === 0
                      ? "border-yellow-300"
                      : "border-gray-500"
                  }
                `}
              >
                <img
                  alt="User photo"
                  src={user.photoUrl}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Details */}
              <div className="flex flex-col overflow-hidden">
                <div className="flex gap-1 text-sm font-medium text-white break-words">
                  <p>{user.firstName}</p>
                  <p>{user.lastName}</p>
                </div>

                {index === 0 && (
                  <p className="text-[11px] text-yellow-300 font-semibold">
                    ⭐ Best AI Match
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);
};

export default NavBar;
