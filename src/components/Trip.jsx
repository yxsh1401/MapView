import TripCard from "./TripCard";
import TrackingCard from "./TrackingCard";
import React, { useState, useCallback } from "react";
import searchIcon from "../assets/images/searchbar/Group 13517.svg";
import rotateIcon from "../assets/images/searchbar/rotate-cw.svg";
import Map from './Map'
const images = import.meta.glob("../assets/images/card/*.svg", { eager: true });

const trips = [
  {
    id: "2867",
    driver: "SATISH JHA",
    company: "EXPRESS ROADWAYS PVT LTD",
    vehicleNumber: "MH03BC9788",
    customer: "ExxonMobil Exploration Company",
    invoice: "2022445",
    ship: "348294923890",
    order: "000001",
    cost: "25,000.00",
    dateTime: "9 Nov '24, ",
    date: "9 Nov",
    time: "1:15 AM",
    atime: "1:16 AM",
    stops: ["C&FA-GHAZIABAD-D30", "BHIWANDI HUB-MUMBAI-D11"],
    source: "C&FA-Manguli-Cuttack-D15",
    destination: "TUKKUGUDA RDC-D34",
    image: images["../assets/images/card/pp1.svg"].default,
  },
  {
    id: "2853",
    driver: "RAMESH RAJU",
    company: "TCI HI-WAYS PVT LTD",
    vehicleNumber: "KA05MN1234",
    customer: "Reliance Industries",
    invoice: "2022450",
    ship: "348294923891",
    order: "000002",
    cost: "30,500.00",
    dateTime: "3 Nov '24, ",
    date: "3 Nov",
    time: "12:15 PM",
    atime: "4:00 PM",
    stops: ["TUKKUGUDA RDC-D34"],
    source: "TUKKUGUDA RDC-D34",
    destination: "Kothur Factory -381-",
    image: images["../assets/images/card/pp2.svg"].default,
  },
  {
    id: "2867",
    driver: "KHALIL SHAIKH",
    company: "BEST ROADWAYS LIMITED",
    vehicleNumber: "MH04XY5678",
    customer: "Amazon Logistics",
    invoice: "2022451",
    ship: "348294923892",
    order: "000003",
    cost: "28,750.00",
    dateTime: "28 Oct '24, ",
    date: "28 Oct",
    time: "12:00 AM",
    atime: "2:00 PM",
    stops: ["C&FA-GHAZIABAD-D30"],
    source: "C&FA-GHAZIABAD-D30",
    destination: "UNNAO-ATFL OWN FACT...",
    image: images["../assets/images/card/pp3.svg"].default,
  },
  {
    id: "2868",
    driver: "KHALIL SHAIKH",
    company: "BEST ROADWAYS LIMITED",
    vehicleNumber: "DL01AB2345",
    customer: "Flipkart Express",
    invoice: "2022452",
    ship: "348294923893",
    order: "000004",
    cost: "27,200.00",
    dateTime: "28 Oct '24, ",
    date: "28 Oct",
    time: "12:00 AM",
    atime: "2:00 PM",
    stops: ["C&FA-GHAZIABAD-D30", "UNNAO-ATFL OWN FACT..."] ,
    source: "C&FA-GHAZIABAD-D30",
    destination: "UNNAO-ATFL OWN FACT...",
    image: images["../assets/images/card/pp2.svg"].default,
  }
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
      <div className="absolute top-[95px]">
        <Map trip={selectedTrip}/>
      </div>
      {selectedTrip !== null && <TrackingCard trip={selectedTrip} />}
    </div>
  );
};

export default TripList;

