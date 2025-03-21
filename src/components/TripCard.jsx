import { useContext, useState } from "react";
import { RouteContext } from "../context/RouteContext";

import pp1 from "../assets/images/card/pp1.svg";
import phone from "../assets/images/card/phone.svg";
import whatsapp from "../assets/images/card/Whatsapp.svg";
import { RxTriangleRight } from "react-icons/rx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const TripCard = ({ trip, index, onTripSelect, setSelectedTrip }) => {
  const { activeRoute, setActiveRoute } = useContext(RouteContext);
  const [isExpanded, setIsExpanded] = useState(false); // Track stop expansion

  return (
    <div
      className="bg-white rounded-lg p-4 mb-3 w-full hover:bg-slate-100"
      // onClick={() => onTripSelect(trip)}
    >
      {/* Header Section */}
      <div className="flex justify-between w-full">
        {/* User Image */}
        <div className="flex items-center">
          <img
            src={trip.image}
            alt={trip.driver}
            className="w-12 h-12 rounded-sm object-cover bg-gray-300"
          />
          <div className="ml-3">
            <p className="text-gray-900 font-bold text-[12px]">
              Trip Id: {trip.id}
            </p>
            <p className="text-gray-800 text-[12px] font-normal">
              {trip.driver}
            </p>
            <p className="text-gray-500 text-xs">{trip.company}</p>
          </div>
        </div>

        {/* Date & Status Indicator */}
        <div>
          <div className="ml-auto flex">
            <span className="text-xs text-gray-900">
              {trip.dateTime}
              <a className="text-xs text-gray-300">{trip.time}</a>
            </span>
            <div className="flex items-center space-x-2 pl-[5px]">
              <span className="w-3 h-3 bg-purple-200 rounded-full relative">
                <span className="absolute inset-0 m-auto w-[7px] h-[6px] bg-purple-500 rounded-full"></span>
              </span>
            </div>
          </div>
          <div className="flex pt-4 gap-5 w-full">
            <div className="ml-auto flex gap-5">
              <img src={phone} alt="phone" />
              <img src={whatsapp} alt="whatsapp" />
            </div>
          </div>
        </div>
      </div>

      {/* Source, Stops & Destination */}
      <div className="mt-3">
        <div className="flex">
          {/* Time Column */}
          <div>
            <div className="flex-col">
              <span className="font-normal text-gray-400 text-[10px] pr-2">
                {trip.time}
              </span>
              <p className="font-normal text-gray-900 text-[12px]">{trip.date}</p>
            </div>
            <div className="flex-col">
              <span className="font-normal text-gray-400 text-[10px] pr-2">
                {trip.atime}
              </span>
              <p className="font-normal text-gray-900 text-[12px]">{trip.date}</p>
            </div>
          </div>

          {/* Route Details */}
          <div className="mt-3">
            {/* Source */}
            <div className="flex-col">
              <div className="flex items-center">
                <span className="w-2 h-2 border-2 border-green-500 rounded-full bg-white"></span>
                <span className="font-normal text-gray-400 text-[10px] pl-2">
                  Source
                </span>
              </div>
              <p className="font-normal text-gray-900 pl-5 text-[12px]">{trip.source}</p>
            </div>

            {/* Intermediate Stops - Only show when expanded */}
            {isExpanded && trip.stops?.length > 0 && (
              <div className="mb-2">
                {trip.stops.map((stop, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full relative">
                      <span className="absolute inset-1 m-auto w-1 h-1 bg-green-500 rounded-full"></span>
                    </span>
                    <div className="flex-col">
                      <span className="font-normal text-gray-400 text-[10px] pl-2">
                        Hop {index + 1}
                      </span>
                      <p className="font-normal text-gray-900 pl-2 text-[12px]">{stop}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Destination */}
            <div className="flex-col pt-1">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full relative">
                  <span className="absolute inset-1 m-auto w-1 h-1 bg-green-500 rounded-full"></span>
                </span>
                <span className="font-normal text-gray-400 text-[10px] pl-2">
                  Destination
                </span>
              </div>
              <p className="font-normal text-gray-900 pl-5 text-[12px]">{trip.destination}</p>
            </div>
          </div>

          {/* Dropdown & Action Button */}
          <div className="ml-auto flex-col gap-5">
            {/* Dropdown Toggle - Only show if stops exist */}
            {trip.stops?.length > 0 && (
              <div className="pt-3">
                <button
                  className="border-2 border-gray-300 rounded-md pl-2 pr-2 p-1 text-sm flex"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents parent click event
                    setIsExpanded(!isExpanded);
                  }}
                >
                  <div className="flex">
                    <div className="text-gray-500">{trip.stops.length}</div>
                    <div className="pt-1 pl-1 text-gray-500">
                      {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Select Trip Button */}
            <div className="pl-5 pt-6">
            <button
  className="w-[18px] h-[18px] flex items-center justify-center border border-red-500 rounded-full"
  onClick={(e) => {
    e.stopPropagation(); // ✅ Prevents parent card from handling the click

    setActiveRoute((prevRoute) => (prevRoute === index ? null : index));

    if (setSelectedTrip) {
      setSelectedTrip((prevTrip) => (prevTrip?.id === trip.id ? null : trip));
    }

    onTripSelect(trip); // ✅ Now, the card loads only when clicking the button
  }}
>
  <span className="text-red-500">
    <RxTriangleRight />
  </span>
</button>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-2"></div>
      </div>
    </div>
  );
};

export default TripCard;
