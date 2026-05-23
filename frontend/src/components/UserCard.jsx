import React from "react";
import { removeUserFromFeed, skipUser } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constatnts";
import { useDispatch } from "react-redux";

const UserCard = ({ kya, showActions = false, mode }) => {
  //Or take (props)

  const { firstName, lastName, photoUrl, _id, gender, about, age, skills, experience, headline, location, gitHub } = kya;
  const dispatch = useDispatch();


  
  
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSkipRequest = (jii) => {
    dispatch(skipUser(jii));
  };

  const goToGitHub= ()=>{

    if (!gitHub) return;

    window.open(gitHub, "_blank", "noopener,noreferrer");
};

 return (
  <div className="flex justify-center px-3 sm:px-0">
    <div
      className="
        group
        w-[95vw] sm:w-[85vw] md:w-[70vw] lg:w-96
        rounded-3xl overflow-hidden
        bg-gradient-to-br from-gray-900 via-gray-800 to-black
        shadow-xl hover:shadow-2xl
        transition-all duration-500
        hover:-translate-y-1
      "
    >
      {/* Image */}
      <figure className="relative h-60 sm:h-72 overflow-hidden">
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

        {/* Name */}
        <h2
          className="
            absolute bottom-4 left-4
            text-xl sm:text-2xl
            font-bold text-white tracking-wide
            drop-shadow-lg
            break-words
            pr-4
          "
        >
          {firstName + " " + lastName}
        </h2>
      </figure>

      {/* Body */}
      <div className="p-4 sm:p-6 space-y-3">
        <p className="text-xs text-gray-500 break-all">{_id}</p>

        <p className="text-sm text-gray-400 truncate">
          {age} {gender}
        </p>

        {/* About */}
        <p
          className="
            text-sm sm:text-base
            text-zinc-300
            font-bold
            break-words
          "
        >
          {about}
        </p>

        {/* Skills */}
        <p
          className="
            text-sm sm:text-base
            text-zinc-300
            font-bold
            break-words
          "
        >
          {skills}
        </p>

        {/* Headline */}
        <p
          className="
            text-sm sm:text-base
            text-zinc-300
            font-bold
            break-words
          "
        >
          {headline} with an experience of {experience} years
        </p>

        {/* Location */}
        <p
          className="
            text-sm sm:text-base
            text-zinc-300
            font-bold
            break-words
          "
        >
          From {location}
        </p>

        {/* ACTIONS */}
        {showActions && (
          <div
            className="
              flex flex-col sm:flex-row
              justify-center
              gap-3 sm:gap-4
              mt-6
            "
          >
            <button
              className="
                px-5 py-2 rounded-full font-semibold
                text-white
                bg-gradient-to-r from-emerald-500 to-green-600
                shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-green-500/40
                active:scale-95
                text-sm sm:text-base
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
                text-sm sm:text-base
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
                text-sm sm:text-base
              "
              onClick={() => handleSkipRequest(_id)}
            >
              Skip
            </button>
          </div>
        )}

        {/* GITHUB */}
        {mode == "edit" && (
          <div className="gitHub flex justify-center pt-2">
            <button
              onClick={goToGitHub}
              className="
                flex overflow-hidden items-center text-sm font-medium
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                disabled:pointer-events-none disabled:opacity-50
                bg-black text-white shadow hover:bg-black/90
                h-9 px-4 py-2
                whitespace-pre
                group relative
                w-full
                justify-center gap-2
                rounded-md
                transition-all duration-300 ease-out
                hover:ring-2 hover:ring-black hover:ring-offset-2
              "
            >
              {/* Light sweep */}
              <span
                className="
                  absolute right-0 -mt-12 h-32 w-8
                  translate-x-12 rotate-12 bg-white opacity-10
                  transition-all duration-1000 ease-out
                  group-hover:-translate-x-40
                "
              />

              {/* GitHub */}
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 438.549 438.549"
                >
                  <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562v-40.823c-6.567 1.136-15.846 1-25.264-.999-14.655-3.047-24.274-12.466-31.69-26.115-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421c21.509-8.562 40.922-9.325 58.24-2.279 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-14.653 44.163-41.062 80.185-79.226 108.068-38.161 27.88-81.126 41.825-128.906 41.825z" />
                </svg>

                <span className="ml-1 text-white">My GitHub</span>
              </div>

              {/* Stars */}
              <div className="ml-2 flex items-center gap-1 text-sm">
                <svg
                  className="
                    w-4 h-4 text-gray-500
                    transition-all duration-300
                    group-hover:text-yellow-300
                  "
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  />
                </svg>

                <span className="inline-block tabular-nums tracking-wider font-medium text-white">
                  6
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default UserCard;
