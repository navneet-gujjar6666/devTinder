import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constatnts";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      console.log(res.data.data);
/*
      //console.log(JSON.stringify(res.data.data));
      We have done this for checking as we are getting data in different order than order of data stored in the mongoDB as because
      of this:
         After populate()-->Converted to a JS object-->Serialized to JSON-->Displayed by Chrome DevTools
         At this point, order is no longer tied to MongoDB.
         that's why we are getting different order in console on doing this-(console.log(res.data.data);), for seeing actual
         correct order we done this-(console.log(JSON.stringify(res.data.data));), in last there is no issue in changed order
         as the console.data just i have the doubt that's why i was just checking all this.
*/
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


const reviewRequest = async (status, _id) => {
    try {
      const res= axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { 
          withCredentials: true 
        }
      );
      dispatch(removeRequests(_id));

    } catch (err) {
      console.log(err);
    }
};



  if (!requests) return;

if (requests.length === 0)
  return (
    <div className="flex justify-center items-center h-64">
      <h1 className="
        text-2xl md:text-3xl lg:text-4xl
        font-extrabold
        text-white
        bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
        bg-clip-text text-transparent
        drop-shadow-lg
      ">
        No Requests Found
      </h1>
    </div>
  );

return (
  <div className="text-center my-10">
    <h1 className="text-3xl font-extrabold text-white mb-8 drop-shadow-lg">
      Total Requests
    </h1>

    {requests.map((kyaBe) => {
      const { _id, firstName, lastName, photoUrl } = kyaBe.fromUserId;

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

            {/* Action Buttons */}
            <div className="flex gap-4 mt-2 justify-center">
              <button
                onClick={() => reviewRequest("accepted", kyaBe._id)}
                className="
                  px-4 py-2 rounded-full font-semibold
                  text-white
                  bg-gradient-to-r from-emerald-500 to-green-600
                  shadow-md
                  transition-all duration-300
                  hover:scale-105 hover:shadow-green-500/40
                  active:scale-95
                "
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequest("rejected", kyaBe._id)}
                className="
                  px-4 py-2 rounded-full font-semibold
                  text-white
                  bg-gradient-to-r from-rose-500 to-red-600
                  shadow-md
                  transition-all duration-300
                  hover:scale-105 hover:shadow-red-500/40
                  active:scale-95
                "
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

};
export default Requests;
