import React, { useState } from "react";
// Profile side
import down from "../assets/images/profile_side/Group 142.svg";
import profile from "../assets/images/profile_side/images (24) 1.png";
import refresh from "../assets/images/profile_side/refresh-cw.svg";
import settings from '../assets/images/settings/sliders.svg'

import cust from '../assets/images/top/cust.png'
import fact from '../assets/images/top/fact.png'
import war from '../assets/images/top/war.png'
import gas from '../assets/images/top/gas.png'
import hotel from '../assets/images/top/hotel.png'

const TopMenuBar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [activeLocTab, setActiveLocTab] = useState("Customers");

  // Tabs for status
  const tabs = [
    { name: "All", outerColor: "bg-[rgba(10,179,140,0.1)]", innerColor: "bg-teal-600" },
    { name: "In-Transit", outerColor: "bg-purple-200", innerColor: "bg-purple-600" },
    { name: "Completed", outerColor: "bg-blue-200", innerColor: "bg-blue-600" },
    { name: "Delayed", outerColor: "bg-red-200", innerColor: "bg-red-600" }
  ];
  // Tabs for locations
  const loctabs = [
    { name: "Customers", icon: <img src={cust} /> },
    { name: "Factories", icon: <img src={fact} /> },
    { name: "Warehouses", icon: <img src={war} /> },
    { name: "Gas Stations", icon: <img src={gas} /> },
    { name: "Hotels", icon: <img src={hotel}/> }
  ];

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="w-full h-[42px] bg-gray-100 p-2">
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex gap-4 text-[12px] text-gray-700">
            <a href="#" className="border-r border-gray-300 pr-3 hover:text-blue-700">Dashboard</a>
            <a href="#" className="pr-3 hover:text-blue-700">Control Tower</a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isToggled}
                onChange={() => setIsToggled(!isToggled)}
              />
              <div className="w-[159px] h-[26px] bg-white border border-gray-300 rounded-full relative flex items-center">
                <div
                  className={`absolute left-1 w-[calc(50%-3px)] h-[calc(100%-6px)] bg-teal-600 rounded-full transition-all ${
                    isToggled ? "translate-x-full" : ""
                  }`}
                ></div>
                <span className="absolute left-5 text-xs text-white">Primary</span>
                <span className="absolute right-3 text-xs text-white">Secondary</span>
              </div>
            </label>

            {/* Refresh Icon */}
            <img src={refresh} alt="refresh" className="w-6 h-6 cursor-pointer" />

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src={profile} alt="Profile" className="w-6 h-6" />
                <span className="ml-2 text-xs">Mansi Khot</span>
                <img src={down} alt="Dropdown" className="w-6 h-6 ml-6" />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 p-2 z-10">
                  <a href="#" className="block p-2 hover:bg-gray-200">Switch Account</a>
                  <a href="#" className="block p-2 hover:bg-gray-200">Add Account</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-1 border-b border-gray-300">
        {/* Status Tabs */}
        <div className="w-[450px] ml-[12px] mb-[8px] mt-[5px]">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-6 py-2 text-gray-500 text-[12px] font-normal transition-all flex items-center gap-2 border-l border-gray-300 
                  ${
                    activeTab === tab.name
                      ? "bg-[rgba(10,179,140,0.1)] text-teal-600"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                {tab.name !== "All" && (
                <span className="relative w-3.5 h-3.5 flex items-center justify-center">
                  <span className={`w-3.5 h-3.5 rounded-full ${tab.outerColor}`} />
                  <span className={`w-1.5 h-1.5 rounded-full ${tab.innerColor} absolute`} />
                </span>
                )}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Location Tabs */}
        <div className="flex items-center gap-4 mr-[23px] ">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden w-fit h-[32px]">
            {loctabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveLocTab(tab.name)}
                className={`flex items-center space-x-2 px-5 py-2 text-gray-600 text-[12px] font-normal transition-all border-l-1 border-gray-300
                  ${
                    activeLocTab === tab.name
                      ? "bg-gray-200 text-gray-700"
                      : "bg-white hover:bg-gray-100"
                  }`}>
                <span>{tab.name}</span>
                <span className="text-lg">{tab.icon}</span>
              </button>
            ))}
          </div>

          {/* External Link Button */}
          <button className="w-8 h-8 flex justify-center items-center border border-gray-300 rounded-md">
            <img src={settings} alt="Open" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopMenuBar;
