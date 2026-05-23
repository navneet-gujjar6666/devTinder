import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUserFromFeed, skipUser } from '../utils/feedSlice';
import { useState } from 'react';
import { BASE_URL } from '../utils/constatnts';
import { useEffect } from 'react';

const Selected = () => {
  const locationJi = useLocation();
  const user = locationJi.state;
  const [data, setdata]= useState(user);

  
  const dispatch = useDispatch();
  const navJi= useNavigate(); 

  
  useEffect(() => {
   setdata(user);
}, [user]);



    if (!data) {

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

const { firstName, lastName, photoUrl, _id, gender, about, age, headline, experience, location } = data;



    const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        },
      );
     setdata(null);
     navJi("/connections");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSkipRequest = (jii) => {
     setdata(null);
  };

  // return(
  //   <>
  //    <UserCard kya={user} showActions={true} />; 
  //   </>
  // )



  return(
    <>
  <div className="flex justify-center">
      <div
        className="
        group w-96 rounded-3xl overflow-hidden
        bg-gradient-to-br from-gray-900 via-gray-800 to-black
        shadow-xl hover:shadow-2xl
        transition-all duration-500
        hover:-translate-y-1
      "
      >
        {/* Image */}
        <figure className="relative h-72 overflow-hidden">
          <img
            src={photoUrl}
            alt="User"
            className="
            w-full h-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
          />

          {/* Gradient overlay */}
          <div
            className="
            absolute inset-0
            bg-gradient-to-t from-black/80 via-black/20 to-transparent
          "
          />

          {/* Name on image */}
          <h2
            className="
            absolute bottom-4 left-4
            text-2xl font-bold text-white tracking-wide
            drop-shadow-lg
          "
          >
            {firstName + " " + lastName}
          </h2>
        </figure>

        {/* Body */}
        <div className="p-6 space-y-3">
          <p className="text-xs text-gray-500 break-all">{_id}</p>
          <p className="text-sm text-gray-400 truncate">
            {age} {gender}
          </p>
          <p className="text-xs text-gray-300 break-all"> I am a {headline}</p>
          <p className="text-xs text-gray-300 break-all">with experience of {experience} year, and from {location}</p>


          <p className="text-xs text-zinc-300 text-4xl font-extrabold break-all">{about}</p>

          {/* Actions */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="
              px-5 py-2 rounded-full font-semibold
              text-white
              bg-gradient-to-r from-emerald-500 to-green-600
              shadow-md
              transition-all duration-300
              hover:scale-105 hover:shadow-green-500/40
              active:scale-95
            "
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>

              <button
                className="
              px-5 py-2 rounded-full font-semibold
              text-white
              bg-gradient-to-r from-rose-500 to-red-600
              shadow-md
              transition-all duration-300
              hover:scale-105 hover:shadow-red-500/40
              active:scale-95
            "
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="
              px-5 py-2 rounded-full font-semibold
              text-white
              bg-gradient-to-r from-white to-black
              shadow-md
              transition-all duration-300
              hover:scale-105 hover:shadow-green-500/40
              active:scale-95
            "
                onClick={() => handleSkipRequest(_id)}
              >
                Skip
              </button>
            </div>
        </div> 
      </div>
    </div>  
  </> 
  )    
};

export default Selected;