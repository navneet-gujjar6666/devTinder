import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constatnts";

const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

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
<div class="$$card w-96 bg-base-100 shadow-sm mx-auto mt-10 h-[300px] w-[500px] bg-cyan-200">
  <div class="$$card-body bg-cyan-200 mt-10 ml-10">
    <div class="flex justify-between">
      <h2 class="text-3xl font-bold">You Are Premium Member</h2>
    </div>
    <ul class="mt-6 flex flex-col gap-2 text-xs">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Till 3 Months</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>50 connection Requests per day</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Customizable style templates</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span> Blue Tick</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>AI-driven image enhancements</span>
      </li>
      <li class="opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span class="line-through">Seamless cloud integration</span>
      </li>
      <li class="opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span class="line-through">Real-time collaboration tools</span>
      </li>
    </ul>
  </div>
</div>
</>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card rounded-box grid h-80 flex-grow place-items-center text-amber-50  bg-gray-900 overflow-hidden">
          <h1 className="font-bold text-3xl      bg-gradient-to-r from-gray-100 via-gray-500 to-white
          bg-clip-text text-transparent
          after:content-['']
          after:absolute after:inset-0
          after:bg-gradient-to-r
          after:from-transparent after:via-white/40 after:to-transparent
          after:-translate-x-full
          hover:after:translate-x-full
          after:transition-transform after:duration-700
          drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn bg-amber-50 text-black"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center text-amber-200  bg-gray-900 overflow-hidden">
          <h1 className="relative text-3xl font-extrabold tracking-wider
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
        ">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinite connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn bg-amber-400 text-black"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
