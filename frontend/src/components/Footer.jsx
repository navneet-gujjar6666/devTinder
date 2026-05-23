import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
return (
  <footer className="w-full bg-gray-900 text-white mt-2">
    {/* Footer container */}
    <div
      className="
        transition-all duration-700 ease-in-out
        border-t border-white/10
      "
    >
      <div
        className="
          p-6 sm:p-10
          flex flex-col sm:flex-row
          items-center sm:items-start
          gap-8 sm:gap-0
          justify-evenly
          text-center sm:text-left
        "
      >
        {/* Services */}
        <div>
          <h3
            className="
              text-lg sm:text-xl
              font-extrabold mb-4
              bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
              bg-clip-text text-transparent
              drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
            "
          >
            Services
          </h3>

          <p className="text-gray-300 text-sm sm:text-base">Branding</p>
          <p className="text-gray-300 text-sm sm:text-base">Design</p>
          <p className="text-gray-300 text-sm sm:text-base">Marketing</p>
        </div>

        {/* Company */}
        <div>
          <h3
            className="
              text-lg sm:text-xl
              font-extrabold mb-4
              bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
              bg-clip-text text-transparent
              drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
            "
          >
            Company
          </h3>

          <p className="text-gray-300 text-sm sm:text-base">About us</p>
          <p className="text-gray-300 text-sm sm:text-base">Contact</p>
          <p className="text-gray-300 text-sm sm:text-base">Jobs</p>
        </div>

        {/* Legal */}
        <div>
          <h3
            className="
              text-lg sm:text-xl
              font-extrabold mb-4
              bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
              bg-clip-text text-transparent
              drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
            "
          >
            Legal
          </h3>

          <p className="text-gray-300 text-sm sm:text-base">
            Terms of use
          </p>

          <p className="text-gray-300 text-sm sm:text-base">
            Privacy policy
          </p>

          <p className="text-gray-300 text-sm sm:text-base">
            Cookie policy
          </p>
        </div>
      </div>
    </div>
  </footer>
);
};

export default Footer;
