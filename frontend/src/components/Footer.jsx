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
    <div className="p-10 flex justify-evenly">
      
      {/* Services */}
      <div>
        <h3
          className="
            text-xl font-extrabold mb-4
            bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
            bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
          "
        >
          Services
        </h3>
        <p className="text-gray-300">Branding</p>
        <p className="text-gray-300">Design</p>
        <p className="text-gray-300">Marketing</p>
      </div>

      {/* Company */}
      <div>
        <h3
          className="
            text-xl font-extrabold mb-4
            bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
            bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
          "
        >
          Company
        </h3>
        <p className="text-gray-300">About us</p>
        <p className="text-gray-300">Contact</p>
        <p className="text-gray-300">Jobs</p>
      </div>

      {/* Legal */}
      <div>
        <h3
          className="
            text-xl font-extrabold mb-4
            bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600
            bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]
          "
        >
          Legal
        </h3>
        <p className="text-gray-300">Terms of use</p>
        <p className="text-gray-300">Privacy policy</p>
        <p className="text-gray-300">Cookie policy</p>
      </div>

    </div>
  </div>
</footer>

  );
};

export default Footer;
