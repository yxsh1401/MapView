import React from "react";
import truck from "../assets/images/truck.png";
import dot from "../assets/images/circle.png";

const TrackingCard = ({ trip }) => {
  if (!trip) return null;
  return (
    <>
      <div className="absolute top-27 left-[920px] transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-[16px] w-[896px] h-[127px] flex-column items-center z-10">
        <div className="flex items-center gap-4 border-b-1 border-gray-300 w-full pb-2 ">
          <div className="text-blue-500 text-xl">
            <img src={truck} className="border-r-1 pr-3 border-gray-300" />
          </div>
          <div className="flex justify-between w-full">
            <div>
              <h2 className="text-[12px] font-regular text-gray-900">
                {trip.company}
              </h2>
              <p className="text-[12px] font-semibold text-gray-500">
                Arriving in ---
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-[12px] font-regular">
                {trip.dateTime}
              </p>
              <p className="text-gray-400 text-[12px] font-regular">
                {trip.atime}
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full flex items-center justify-between p-5 pl-2">
          {/* Left Dot */}
          <div>
            <img src={dot} className="w-[15px] relative z-10" />
            {/* <div>
                    <p className="text-[10px] text-gray-600 ml-[-8px]">12:20pm</p>
                </div> */}
          </div>

          {/* SVG Polyline */}
          <svg
            className="absolute left-0 right-0 w-full h-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="12"
              y1="50%"
              x2="97%"
              y2="50%"
              stroke="currentColor"
              strokeWidth="5"
              className="text-gray-200"
            />
          </svg>

          {/* Right Dot */}
          <img src={dot} className="w-[15px] relative z-10" />
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-[10px] text-gray-600 ml-[-8px] mt-[-15px] pl-2">
              {trip.time}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mr-[8px] mt-[-15px]">
              {trip.atime}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingCard;
