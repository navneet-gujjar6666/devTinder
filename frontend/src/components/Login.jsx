import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constatnts";

const Login = () => {
  const [emailId, setEmailId] = useState("pravesh@gmail.com");
  const [password, setPassword] = useState("Pravesh@1111");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError]= useState("");
  const dispatch = useDispatch();
  const navJi = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("before");
      const res = await axios.post(
        //Go to dimag.md
        BASE_URL + "/login2",
        {
          emailId,
          password,
        },
        {
          withCredentials: true, // 🔥 REQUIRED
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data)); //We have done here res.data.data instead of only res.data because inside data two things:
                                        //1.]]Message, 2.]Data so till reaching 2.]Data inside big Data we have to done all this.
      return navJi("/");
    } catch (err) {
      setError(error?.response?.data || "Something went wrong");
      console.error(err);
    }
  };


  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navJi("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
    <div className="flex justify-center mt-28">
      <div className="relative w-96 rounded-3xl bg-gradient-to-br from-blue-800 via-purple-700 to-indigo-900 p-[2px] shadow-2xl animate-fadeIn">
        <div className="card card-border bg-gray-900/90 backdrop-blur-xl rounded-3xl">
          <div className="card-body relative pt-20 px-6 pb-6">

            {/* Header */}
            <h2 className="
              absolute top-0 left-0 w-full h-16
              flex items-center justify-center
              text-xl font-bold tracking-wide text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              rounded-t-3xl
              shadow-lg
              animate-slideDown
            ">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>

            {/* Signup-only fields */}
            {!isLoginForm && (
              <>
                <div className="inputData animate-fadeUp">
                  <fieldset className="fieldset">
                    <label className="fieldset-legend text-gray-300 mt-6 ml-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      className="
                        input w-full rounded-xl
                        bg-black/70 text-amber-100
                        border border-gray-700
                        focus:border-purple-500 focus:ring-2 focus:ring-purple-500
                        transition-all duration-300
                      "
                      placeholder="Type here"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                </div>

                <div className="inputData animate-fadeUp delay-75">
                  <fieldset className="fieldset">
                    <label className="fieldset-legend text-gray-300 ml-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      className="
                        input w-full rounded-xl
                        bg-black/70 text-amber-100
                        border border-gray-700
                        focus:border-purple-500 focus:ring-2 focus:ring-purple-500
                        transition-all duration-300
                      "
                      placeholder="Type here"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </div>
              </>
            )}

            {/* Email */}
            <div className="inputData animate-fadeUp delay-100">
              <fieldset className="fieldset">
                <label className="fieldset-legend text-gray-300 ml-2 mt-6">
                  Email
                </label>
                <input
                  type="text"
                  value={emailId}
                  className="
                    input w-full rounded-xl
                    bg-black/70 text-amber-100
                    border border-gray-700
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500
                    transition-all duration-300
                  "
                  placeholder="Type here"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
            </div>

            {/* Password */}
            <div className="inputData animate-fadeUp delay-150">
              <fieldset className="fieldset">
                <label className="fieldset-legend text-gray-300 ml-2">
                  Password
                </label>
                <input
                  type="text"
                  value={password}
                  className="
                    input w-full rounded-xl
                    bg-black/70 text-amber-100
                    border border-gray-700
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500
                    transition-all duration-300
                  "
                  placeholder="Type here"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>

            {/* Error */}
            <p className="text-red-500 text-sm text-center mt-2 animate-shake">
              {error}
            </p>

            {/* Action Button */}
            <div className="card-actions justify-center mt-4">
              <button
                className="
                  relative overflow-hidden
                  px-8 py-2 rounded-full
                  text-white font-semibold
                  bg-gradient-to-r from-purple-500 to-indigo-600
                  shadow-lg
                  transition-all duration-300
                  hover:scale-105 hover:shadow-purple-500/40
                  active:scale-95
                "
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>

            {/* Switch form */}
            <p
              className="
                m-auto mt-3 cursor-pointer
                text-sm text-purple-300
                hover:text-purple-200
                transition-colors duration-200
              "
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Signup Here"
                : "Existing User? Login Here"}
            </p>

          </div>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Login;