import React, { useState } from "react";

// Images import
import logo from "../assets/images/left panel/Rectangle 1918.png";
import logoMax from "../assets/images/left panel/Rectangle big.png";
import dash from "../assets/images/left panel/layout 1.svg";
import plan from "../assets/images/left panel/edit 1.svg";
import trip from "../assets/images/left panel/truck 1.svg";
import master from "../assets/images/left panel/users 1.svg";
import invoice from "../assets/images/left panel/file 1.svg";
import report from "../assets/images/left panel/file-text 1.svg";
import control from "../assets/images/left panel/radio 1.svg";
import help from "../assets/images/left panel/book-open 1.svg";

const LeftNavBar = ({ onHoverChange }) => {
  const LeftList = [
    { id: 1, image: dash, text: "Dashboard" },
    { id: 2, image: plan, text: "Planning" },
    { id: 3, image: trip, text: "Trips" },
    { id: 4, image: master, text: "Masters" },
    { id: 5, image: invoice, text: "Invoice" },
    { id: 6, image: report, text: "Reports" },
    { id: 7, image: control, text: "Control" },
  ];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative top-0 left-0 h-screen bg-white border-[0.5px] border-gray-300 transition-all duration-300 ${
        isHovered ? "w-[219px]" : "w-[50px]"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange(false);
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center px-[12px] py-4 h-[128px]">
        <img
          className={`w-[24px] h-[24px] transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          src={logo}
          alt="Logo"
        />
        <img
          className={`w-[101px] h-[72px] mt-[12px] ml-[39px] absolute transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          src={logoMax}
          alt="Logo Hover"
        />
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col mt-4 space-y-2">
        <div className="w-full border-t border-gray-300"></div>
        {LeftList.map((item, index) => (
          <a
            key={index}
            href={item.text}
            className="flex items-center px-4 py-2 hover:bg-[rgba(40,0,252,0.1)] rounded-lg transition group"
          >
            {/* Image with hover effect */}
            <img
              src={item.image}
              className="w-[18px] h-6 transition duration-300 group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-180"
              alt="icon"
            />
            {/* Text - Visible only when expanded */}
            <span
              className={`ml-4 text-sm font-semibold text-gray-500 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              } group-hover:opacity-100`}
            >
              <h1 className="transition duration-300 group-hover:text-blue-600">
                {item.text}
              </h1>
            </span>
          </a>
        ))}
        <div className="w-full border-t border-gray-300"></div>
      </div>

      {/* Help Section - Now follows the same behavior */}
      <div className="absolute mt-4 left-0 w-full">
        <a
          href="#"
          className="flex items-center w-full px-4 py-2 hover:bg-[rgba(40,0,252,0.1)] rounded-lg transition group"
        >
          {/* Image with hover effect */}
          <img
            src={help}
            alt="Help"
            className="w-[18px] h-6 transition duration-300 group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-180"
          />
          {/* Help Text - Hidden when collapsed */}
          <span
            className={`ml-4 text-sm font-semibold text-gray-500 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
          >
            <h1 className="transition duration-300 group-hover:text-blue-600">
              Help
            </h1>
          </span>
        </a>
      </div>

      <div className="w-full border-t border-gray-300"></div>
    </div>
  );
};

export default LeftNavBar;
