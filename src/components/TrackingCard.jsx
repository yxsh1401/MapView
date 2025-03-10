import React, { useEffect, useState } from "react";
import truckIcon from "../assets/images/struck.png";
import start from "../assets/images/start.png";
import end from "../assets/images/endg.png";

const TrackingCard = ({ trip }) => {
  if (!trip) return null;

  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };

  const departureTime = parseTime(trip.time);
  const arrivalTime = parseTime(trip.atime);
  const duration = arrivalTime && departureTime ? (arrivalTime - departureTime) / 60000 : 0;

  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 60000);

    return () => clearInterval(timer);
  }, [duration]);

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  // Calculate progress
  const progress = duration > 0 ? (1 - remainingTime / duration) : 1; // 0 to 1 scale
  const truckPositionX = 12 + progress * (95 - 12); // Moves from x1=12 to x2=95 in SVG
  const completedLineWidth = `${10 + progress * 80}%`; // Completed path width

  return (
    <div className="absolute bottom-7 left-[960px] transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-[16px] w-[456px] h-[120px] flex-column items-center z-10">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-300 w-full pb-2">
        <div className="flex justify-between w-full">
          <h2 className="text-[10px] font-bold text-blue-600">{trip.company}</h2>
          <p className="text-[10px] font-semibold text-blue-600">
            Arriving in {remainingTime > 0 ? formatTime(remainingTime) : "Now"}
          </p>
        </div>
      </div>

      {/* Route Visualization */}
      <div className="relative w-full flex items-center justify-between p-5 pl-2">
        {/* Start Point */}
        <img src={start} className="w-[20px] relative z-10" alt="Start" />

        {/* SVG Route */}
        <svg className="absolute left-0 right-0 w-full h-2" xmlns="http://www.w3.org/2000/svg">
          {/* Completed Path (Green) */}
          <line x1="5%" y1="50%" x2={completedLineWidth} y2="50%" stroke="green" strokeWidth="5" />
          
          {/* Remaining Path (Gray) */}
          <line x1={completedLineWidth} y1="50%" x2="93%" y2="50%" stroke="gray" strokeWidth="5" />
        </svg>

        {/* Truck Icon Moving */}
        <img 
          src={truckIcon} 
          className="w-[25px] absolute z-20 transform -translate-y-1/2" 
          style={{ left: `${truckPositionX}%`, top: "50%" }} 
          alt="Truck"
        />

        {/* End Point */}
        <img src={end} className="w-[15px] relative z-10" alt="End" />
      </div>

      {/* Time Labels */}
      <div className="flex justify-between">
        <p className="text-[10px] text-gray-600 ml-[-8px] mt-[-15px] pl-2">{trip.time}</p>
        <p className="text-[10px] text-gray-600 mr-[8px] mt-[-15px]">{trip.atime}</p>
      </div>
    </div>
  );
};

export default TrackingCard;
  