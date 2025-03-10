import TripCard from "./TripCard";
import TrackingCard from "./TrackingCard";
import React, { useState, useCallback } from "react";
import searchIcon from "../assets/images/searchbar/Group 13517.svg";
import rotateIcon from "../assets/images/searchbar/rotate-cw.svg";
const images = import.meta.glob("../assets/images/card/*.svg", { eager: true });

const trips = [
  {
    id: "2867",
    driver: "SATISH JHA",
    company: "EXPRESS ROADWAYS PVT LTD",
    dateTime: "9 Nov '24, ",
    date: "9 Nov",
    time: "1:15 AM",
    atime: "1:16 AM",
    stops: [
    "C&FA-GHAZIABAD-D30",
    "BHIWANDI HUB-MUMBAI-D11"
  ],
    source: "C&FA-Manguli-Cuttack-D15",
    destination: "TUKKUGUDA RDC-D34",
    image: images["../assets/images/card/pp1.svg"].default,
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
    image: images["../assets/images/card/pp2.svg"].default,
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
    image: images["../assets/images/card/pp3.svg"].default,
  },
  {
    id: "2868",
    driver: "KHALIL SHAIKH",
    company: "BEST ROADWAYS LIMITED",
    dateTime: "28 Oct '24, ",
    date: "28 Oct",
    time: "12:00 AM",
    atime: "2:00 PM",
    source: "C&FA-GHAZIABAD-D30",
    destination: "UNNAO-ATFL OWN FACT...",
    image: images["../assets/images/card/pp2.svg"].default,
  },
  {
    id: "2901",
    driver: "RAJESH KUMAR",
    company: "BLUE DART EXPRESS LTD",
    dateTime: "15 Nov '24, ",
    date: "15 Nov",
    time: "5:30 AM",
    atime: "3:45 PM",
    source: "BHIWANDI HUB-MUMBAI-D11",
    destination: "DELHI CARGO TERMINAL-D19",
    image: images["../assets/images/card/pp1.svg"].default,
  },
  {
    id: "2934",
    driver: "ANIL SHARMA",
    company: "GATI TRANSPORTATION LTD",
    dateTime: "21 Nov '24, ",
    date: "21 Nov",
    time: "7:00 AM",
    atime: "6:30 PM",
    source: "HOWRAH WAREHOUSE-KOLKATA-D12",
    destination: "PUNE DISTRIBUTION CENTER-D27",
    image: images["../assets/images/card/pp3.svg"].default,
  },
  {
    id: "2980",
    driver: "MOHAN VERMA",
    company: "SAFE EXPRESS LOGISTICS",
    dateTime: "2 Dec '24, ",
    date: "2 Dec",
    time: "9:45 AM",
    atime: "8:00 PM",
    source: "NOIDA STORAGE FACILITY-D23",
    destination: "CHENNAI TRADE HUB-D41",
    image: images["../assets/images/card/pp2.svg"].default,
  },
  {
    id: "3012",
    driver: "SUNIL YADAV",
    company: "VRL LOGISTICS LTD",
    dateTime: "5 Dec '24, ",
    date: "5 Dec",
    time: "11:30 AM",
    atime: "9:30 PM",
    source: "BANGALORE CENTRAL HUB-D31",
    destination: "HYDERABAD REGIONAL CENTER-D37",
    image: images["../assets/images/card/pp3.svg"].default,
  },
];

const TripList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const resetStatusFilters = () => {
    setSearchTerm("");
  };

  const onTripSelect = useCallback((trip, index) => {
    setSelectedTrip((prevTrip) =>
      prevTrip?.id === trip.id && prevTrip?.index === index
        ? null
        : { ...trip, index }
    );
  }, []);

  // Filter trips based on the search term
  const filteredTrips = trips.filter((trip) =>
    Object.values(trip).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="border-r-1 border-gray-300 w-[400px]">
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
            <button
              onClick={resetStatusFilters}
              className="h-[32px] w-[32px] ml-3 border rounded-md border-gray-300 flex items-center justify-center"
            >
              <img src={rotateIcon} className="w-4 h-4" alt="reset" />
            </button>
          </div>
        </div>

        <div className="w-[400px] h-[600px] p-4 overflow-y-auto no-scrollbar rounded-lg">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip, index) => (
              <TripCard
                key={index}
                trip={trip}
                index={index}
                onTripSelect={onTripSelect}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm mt-4">
              No trips found.
            </p>
          )}
        </div>
      </div>
      {/* Right Panel: Tracking Card (conditionally displayed) */}
      {selectedTrip !== null && <TrackingCard trip={selectedTrip} />}
    </div>
  );
};

export default TripList;

