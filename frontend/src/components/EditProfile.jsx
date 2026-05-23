import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constatnts";
import { addUser } from "../utils/userSlice";
import "../App.css"

const EditProfile = ({ wow }) => {
  const [firstName, setFirstName] = useState(wow.firstName || " "); //We have done this as because of suposse we didnt have the
  //firstName from wow so wow.firstName is-(undefined), so like on editUI when trying to add firstName it will show error as we
  //got firstName as undefined from wow, but if we do-(" ") so now even if we didnt have the firstName from wow so by doing this
  //wow.firstName will be the-("") which will not make any error while editing as earlier on editing on undefined we were getting.
  const [lastName, setLastName] = useState(wow.lastName || " ");
  const [photoUrl, setPhotoUrl] = useState(wow.photoUrl || " ");
  const [age, setAge] = useState(wow.age || " ");
  const [gender, setGender] = useState(wow.gender || " ");
  const [about, setAbout] = useState(wow.about || " Here are a few options, choose the one that best fits your specific style: **Option 1 (Focus on Skill & Strategy):** As a professional footballer, I leverage advanced technical prowess and strategic acumen on the pitch. My dynamic contributions are instrumental in shaping game outcomes and securing competitive advantage. **Option 2 (Focus on Dedication & Impact):** A dedicated professional footballer, I am committed to mastering the intricate dynamics of the beautiful game. My relentless pursuit of on-pitch excellence consistently drives team performance and contributes to shared triumphs. **Option 3 (Focus on Athleticism & Professionalism):** Operating within the elite echelons of professional football, I embody disciplined athleticism and an unwavering commitment to the sport's highest standards. My contributions are meticulously honed to impact critical moments and elevate team success.");
  const [showActions, setShowActions] = useState(true);



  const [skills, setSkills] = useState(wow.skills || " ");
  const [experience, setExperience] = useState(wow.experience || " ");
  const [headline, setHeadline] = useState(wow.headline || " ");
  const [location, setLocation] = useState(wow.location || " ");
  const [gitHub, setGitHub] = useState(wow.gitHub || " ");



  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);



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
          photoUrl,      
          skills,
          experience,
          headline,
          location,
          gitHub
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

  const generateAi= async(e)=>{
      
    e.preventDefault();

    if(loading) return;
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL+ "/ai", {
        about,
      },{
        withCredentials: true
      });

      setAbout(res.data.data);
    } catch (err) {
      console.error("Error fetching Gemini response:", err);
      setAbout("Failed to get a response.");

    }
    setLoading(false);    
  }



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
              text-white h-[85vh]
              overflow-hidden
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

              <div className="space-y-6 overflow-y-auto h-full pr-2 hide-scrollbar">
                {/* First Name */}
                <div className="relative mt-2">
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
                 
                  <textarea
                    id="about"
                    type="text"
                    value={about}
                    required
                    placeholder="Type Here"
                    className="
                    peer mt-3 h-fit w-[250px] hide-scrollbar overflow-y-auto
                    whitespace-pre-wrap  resize-none
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <button className="btn btn-secondary h-5 w-[60px] border-2 pl-10 pr-10 border-amber-50 absolute right-0 top-0" onClick={generateAi} disabled={loading}>
                    {loading ? "Thinking..." : "AboutAi"}
                    </button>
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


                {/* Skills */}
                <div className="relative">
                  <input
                    id="skills"
                    type="text"
                    value={skills}
                    required
                    placeholder="Type Skills Here"
                    className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <label
                    htmlFor="skills"
                    className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                  >
                    Skills
                  </label>
                </div>

                {/* Experience */}
                <div className="relative">
                  <input
                    id="experience"
                    type="text"
                    value={experience}
                    required
                    placeholder="Type Here"
                    className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <label
                    htmlFor="experience"
                    className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                  >
                    Experience Years
                  </label>
                </div>

                {/* Headline */}
                <div className="relative">
                  <input
                    id="headline"
                    type="text"
                    value={headline}
                    required
                    placeholder="Type Here"
                    className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                  <label
                    htmlFor="headline"
                    className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                  >
                  Headline
                  </label>
                </div>

                {/* Location */}
                <div className="relative">
                  <input
                    id="location"
                    type="text"
                    value={location}
                    required
                    placeholder="Type Here"
                    className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label
                    htmlFor="location"
                    className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                  >
                  Location
                  </label>
                </div>

                {/* GitHub */}
                <div className="relative">
                  <input
                    id="gitHub"
                    type="text"
                    value={gitHub}
                    required
                    placeholder="Type Here"
                    className="
                    peer h-10 w-full
                    border-b border-gray-600
                    bg-transparent text-white
                    focus:outline-none focus:border-emerald-500
                  "
                    onChange={(e) => setGitHub(e.target.value)}
                  />
                  <label
                    htmlFor="gitHub"
                    className="
                    absolute left-0 -top-3.5 text-sm
                    text-gray-500 transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-focus:-top-3.5
                    peer-focus:text-emerald-400
                  "
                  >
                  GitHub
                  </label>
                </div>  


                <p className="text-rose-400">{error}</p>

                {/* Save Button */}
                <button
                  onClick={saveProfile}
                  className="
                  w-full py-3 rounded-full mb-8
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
        <UserCard
          kya={{ firstName, lastName, photoUrl, age, gender, about, skills, experience, headline, location, gitHub }}
          mode={"edit"}
        />
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
