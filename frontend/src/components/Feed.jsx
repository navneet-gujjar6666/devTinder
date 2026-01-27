import React from "react";
import { BASE_URL } from "../utils/constatnts";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
      console.log("fromFeed: ", res.data.data);
    } catch (err) {
      //TODO: handle ERROR
    }
  };

  useEffect(() => {
   if (!user) return;   //wait for login
    getFeed();           //fetch fresh feed for this user
  }, [user]);           //🔑user-driven fetch

  if(!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10 font-bold text-4xl text-white">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center">
        <UserCard kya={feed[0]} showActions={true} />
      </div>
    )
  );
};

export default Feed;
