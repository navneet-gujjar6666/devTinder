import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constatnts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from 'react-router-dom'

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      //Handle error case
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections){
    return (
      <h1 className="text-center text-4xl font-extrabold tracking-wider
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
        ">
        {" "}
        Issue While Fetching Connections
      </h1>
    );

  }

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-4xl font-extrabold  text-white drop-shadow-lg">
        {" "}
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-extrabold text-white mb-8 drop-shadow-lg">
        Connections
      </h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl } = connection;

        return (
          <div
            key={_id}
            className="
            group flex items-center gap-4 p-4
            w-1/2 mx-auto mb-6
            bg-gradient-to-br from-gray-900 via-gray-800 to-black
            rounded-3xl shadow-xl
            transition-all duration-500
            hover:-translate-y-1 hover:shadow-2xl
          "
          >
            {/* User Image */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={photoUrl}
                alt="User"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-full" />
            </div>

            {/* User Info */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-white text-xl font-bold drop-shadow-md">
                {firstName} {lastName}
              </h2>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn bg-green-400 rounded-2xl">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connection;
