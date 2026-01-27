import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constatnts";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ wow }) => {
  const [firstName, setFirstName] = useState(wow.firstName || " "); //We have done this as because of suposse we didnt have the
  //firstName from wow so wow.firstName is-(undefined), so like on editUI when trying to add firstName it will show error as we
  //got firstName as undefined from wow, but if we do-(" ") so now even if we didnt have the firstName from wow so by doing this
  //wow.firstName will be the-("") which will not make any error while editing as earlier on editing on undefined we were getting.
  const [lastName, setLastName] = useState(wow.lastName || " ");
  const [photoUrl, setPhotoUrl] = useState(wow.photoUrl || " ");
  const [age, setAge] = useState(wow.age || " ");
  const [gender, setGender] = useState(wow.gender || " ");
  const [about, setAbout] = useState(wow.about || " ");
  const [showActions, setShowActions]= useState(true);

  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  
  const saveProfile = async () => {
    //Clear Errors before saving
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
    } catch (err) {
      setError(err.response.data);
    }
  };

return (
  <>
    <div className="flex gap-6 justify-center min-h-[70%]">
      <div className="flex justify-center">
        <div
          className="
            w-96 rounded-3xl overflow-hidden
            bg-gradient-to-br from-gray-900 via-gray-800 to-black
            shadow-xl hover:shadow-2xl
            transition-all duration-500
          "
        >
          <div
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            className="
              relative pt-16 p-8 space-y-8
              text-white
            "
          >
            <h2
              style={{ animation: "appear 2s ease-out" }}
              className="
                absolute top-0 left-0 w-full h-16
                flex items-center justify-center
                text-3xl font-extrabold tracking-wide
                bg-gradient-to-r from-emerald-500 to-green-600
                shadow-lg
              "
            >
              Edit Profile
            </h2>

            <p
              style={{ animation: "appear 3s ease-out" }}
              className="text-center text-gray-400"
            >
              Your Profile
            </p>

            <div className="space-y-6">
              {/* First Name */}
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  required
                  placeholder="Type Here"
                  className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label
                  htmlFor="firstName"
                  className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                >
                  First Name
                </label>
              </div>

              {/* Last Name */}
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  required
                  placeholder="Type Here"
                  className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label
                  htmlFor="lastName"
                  className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                >
                  Last Name
                </label>
              </div>

              
              {/* Age */}
              <div className="relative">
                <input
                  id="age"
                  type="text"
                  value={age}
                  required
                  placeholder="Type Here"
                  className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                  onChange={(e) => setAge(e.target.value)}
                />
                <label
                  htmlFor="age"
                  className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                >
                  Age
                </label>
              </div>

              
              {/* Gender */}
              <div className="relative">
                <input
                  id="gender"
                  type="text"
                  value={gender}
                  required
                  placeholder="Type Here"
                  className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                  onChange={(e) => setGender(e.target.value)}
                />
                <label
                  htmlFor="gender"
                  className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                >
                  Gender
                </label>
              </div>

              {/* About */}
              <div className="relative">
                <input
                  id="about"
                  type="text"
                  value={about}
                  required
                  placeholder="Type Here"
                  className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                  onChange={(e) => setAbout(e.target.value)}
                />
                <label
                  htmlFor="about"
                  className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                >
                  About
                </label>
              </div>

              {/* Photo URL */}
              <div className="relative">
                <input
                  id="photoUrl"
                  type="text"
                  value={photoUrl}
                  required
                  placeholder="Type Here"
                  className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <label
                  htmlFor="photoUrl"
                  className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                >
                  Photo Url
                </label>
              </div>

              <p className="text-rose-400">{error}</p>

              {/* Save Button */}
              <button
                onClick={saveProfile}
                className="
                  w-full py-3 rounded-full
                  text-lg font-semibold text-white
                  bg-gradient-to-r from-emerald-500 to-green-600
                  shadow-md
                  transition-all duration-300
                  hover:scale-105 hover:shadow-emerald-500/40
                  active:scale-95
                "
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Card Preview (unchanged) */}
      <UserCard kya={{ firstName, lastName, photoUrl, age, gender, about }} mode={"edit"} />
    </div>

    {toast && (
      <div className="toast toast-top toast-end z-1000">
        <div className="alert alert-success">
          <span>Profile UPDATED successfully.</span>
        </div>
      </div>
    )}
  </>
);

};

export default EditProfile;
