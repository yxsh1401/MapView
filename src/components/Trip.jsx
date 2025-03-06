import TripCard from "./TripCard";
import React, { useState } from "react";
import searchIcon from '../assets/images/searchbar/Group 13517.svg';
import rotateIcon from '../assets/images/searchbar/rotate-cw.svg';
import Map from "./Map";

const trips = [
  {
    id: "2867",
    driver: "SATISH JHA",
    company: "EXPRESS ROADWAYS PVT LTD",
    dateTime: "9 Nov '24, ",
    date: "9 Nov",
    time: "1:15 AM",
    atime: "8:00 PM",
    source: "C&FA-Manguli-Cuttack-D15",
    destination: "TUKKUGUDA RDC-D34",
    image: "pp1",
  },
  {
    id: "2853",
    driver: "RAMESH RAJU",
    company: "TCI HI-WAYS PVT LTD",
    dateTime: "3 Nov '24, ",
    date: "3 Nov",
    time: "12:15 PM",
    atime: "4:00 PM",
    source: "TUKKUGUDA RDC-D34",
    destination: "Kothur Factory -381-",
    image: "pp2",
  },
  {
    id: "2867",
    driver: "KHALIL SHAIKH",
    company: "BEST ROADWAYS LIMITED",
    dateTime: "28 Oct '24, ",
    date: "28 Oct",
    time: "12:00 AM",
    atime: "2:00 PM",
    source: "C&FA-GHAZIABAD-D30",
    destination: "UNNAO-ATFL OWN FACT...",
    image: "pp3",
  },
];

const TripList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const resetStatusFilters = () => {
        setSearchTerm("");
    };

    return (
        <div className="border-r-1 border-gray-300 w-[400px]">
            {/* Always display the map */}
            <Map />
            
            <div className="pt-2">
                <div className="pl-[7px] pr-[7px] flex ml-3">
                    <div className="flex items-center border border-gray-300 rounded-md h-[32px] w-[310px] bg-white">
                        <img src={searchIcon} alt="search" className="w-4 h-4 ml-3" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="ml-2 outline-none w-full text-[12px]"
                        />
                    </div>
                    <button onClick={resetStatusFilters} className="h-[32px] w-[32px] ml-3 border rounded-md border-gray-300 flex items-center justify-center">
                        <img src={rotateIcon} className="w-4 h-4" alt="reset" />
                    </button>
                </div>
            </div>
            
            <div className="w-[400px] h-[764px] p-4 overflow-y rounded-lg">
                {trips.map((trip, index) => (
                    <TripCard key={index} trip={trip} index={index} />
                ))}
            </div>
        </div>
    );
};

export default TripList;
