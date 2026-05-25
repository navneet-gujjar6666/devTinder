import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constatnts";

const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false);


  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };



  return isUserPremium ? (
  <>
    <div
      className="
        w-[95vw] sm:w-[85vw] md:w-[70vw] lg:w-[500px]
        bg-cyan-200
        shadow-sm
        mx-auto
        mt-6 sm:mt-10
        min-h-[300px]
        rounded-3xl
        overflow-hidden
      "
    >
      <div className="bg-cyan-200 p-5 sm:p-10">
        <div className="flex justify-between">
          <h2
            className="
              text-2xl sm:text-3xl
              font-bold
              break-words
            "
          >
            You Are Premium Member
          </h2>
        </div>

        <ul
          className="
            mt-6
            flex flex-col gap-3
            text-xs sm:text-sm
            break-words
          "
        >
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span>Till 3 Months</span>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span>50 connection Requests per day</span>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span>Customizable style templates</span>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span>Blue Tick</span>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 me-2 inline-block text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <span>AI-driven image enhancements</span>
          </li>
        </ul>
      </div>
    </div>
  </>
) : (
  <div className="px-3 sm:px-6 my-6 sm:my-10">
    <div
      className="
        flex flex-col lg:flex-row
        items-center
        gap-6 lg:gap-0
        w-full
      "
    >
      {/* SILVER */}
      <div
        className="
          card rounded-box
          w-[95vw] sm:w-[85vw] lg:flex-grow
          min-h-[320px]
          place-items-center
          text-amber-50
          bg-gray-900
          overflow-hidden
          p-6
          flex flex-col justify-center
        "
      >
        <h1
          className="
            text-2xl sm:text-3xl
            font-bold
            text-center
            bg-gradient-to-r from-gray-100 via-gray-500 to-white
            bg-clip-text text-transparent
            after:content-['']
            after:absolute after:inset-0
            after:bg-gradient-to-r
            after:from-transparent after:via-white/40 after:to-transparent
            after:-translate-x-full
            hover:after:translate-x-full
            after:transition-transform after:duration-700
            drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]
          "
        >
          Silver Membership
        </h1>

        <ul
          className="
            mt-5
            text-sm sm:text-base
            space-y-2
            text-center
          "
        >
          <li>- Chat with other people</li>
          <li>- 100 connection Requests per day</li>
          <li>- Blue Tick</li>
          <li>- 3 months</li>
        </ul>

        <button
          onClick={() => handleBuyClick("silver")}
          className="
            btn bg-amber-50 text-black
            mt-6
            w-full sm:w-auto
          "
        >
          Buy Silver
        </button>
      </div>

      {/* OR */}
      <div
        className="
          divider lg:divider-horizontal
          text-white
        "
      >
        OR
      </div>

      {/* GOLD */}
      <div
        className="
          card rounded-box
          w-[95vw] sm:w-[85vw] lg:flex-grow
          min-h-[320px]
          place-items-center
          text-amber-200
          bg-gray-900
          overflow-hidden
          p-6
          flex flex-col justify-center
        "
      >
        <h1
          className="
            relative
            text-2xl sm:text-3xl
            font-extrabold tracking-wide sm:tracking-wider
            text-center
            bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
            bg-clip-text text-transparent
            after:content-['']
            after:absolute after:inset-0
            after:bg-gradient-to-r
            after:from-transparent after:via-amber-500/40 after:to-transparent
            after:-translate-x-full
            hover:after:translate-x-full
            after:transition-transform after:duration-700
            drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
          "
        >
          Gold Membership
        </h1>

        <ul
          className="
            mt-5
            text-sm sm:text-base
            space-y-2
            text-center
          "
        >
          <li>- Chat with other people</li>
          <li>- Infinite connection Requests per day</li>
          <li>- Blue Tick</li>
          <li>- 6 months</li>
        </ul>

        <button
          onClick={() => handleBuyClick("gold")}
          className="
            btn bg-amber-400 text-black
            mt-6
            w-full sm:w-auto
          "
        >
          Buy Gold
        </button>
      </div>
    </div>
  </div>
);};

export default Premium;
