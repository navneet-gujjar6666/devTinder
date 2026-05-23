import React from "react";
import { BASE_URL } from "../utils/constatnts";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
      // console.log("fromFeed: ", res.data.data);
    } catch (err) {
      console.log("Error: ", +err.message);
    }
  };

  useEffect(() => {
    if (!user) return; //wait for login
    getFeed(); //fetch fresh feed for this user
  }, [user]); //🔑user-driven fetch

  if (!user) {
    return (
      <div
        className="
      navbar mt-10 mb-10 h-52
      border-b border-white/10
      shadow-xl
      px-6 z-[999] flex justify-center items-center text-center
    "
      >
        {/* LEFT: Logo */}
        <div className="flex-1">
          <Link
            className="
          relative text-8xl font-extrabold tracking-wider
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
            DevTinder.Com
          </Link>
        </div>
      </div>
    );
  }

  if (!feed) {
    return (
      <h1
        className="text-center text-4xl font-extrabold tracking-wider
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
        {" "}
        Issue While Fetching Feeds
      </h1>
    );
  }

  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center my-10 font-bold text-4xl text-white">
        No new users founds!
      </h1>
    );

  return (
    feed && (
      <div className="flex justify-center">
        <UserCard kya={feed[0]} showActions={true} />
      </div>
    )
  );
};

export default Feed;
