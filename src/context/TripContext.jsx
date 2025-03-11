import { createContext, useContext, useState } from "react";

// Create Trip Context
const TripContext = createContext();

// Trip Provider Component
export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([
    {
      id: "2867",
      driver: "SATISH JHA",
      company: "EXPRESS ROADWAYS PVT LTD",
      dateTime: "9 Nov '24, ",
      date: "9 Nov",
      time: "1:15 AM",
      atime: "1:16 AM",
      stops: ["C&FA-GHAZIABAD-D30", "BHIWANDI HUB-MUMBAI-D11"],
      source: "C&FA-Manguli-Cuttack-D15",
      destination: "TUKKUGUDA RDC-D34",
      image: "../assets/images/card/pp1.svg",
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
      image: "../assets/images/card/pp2.svg",
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
      image: "../assets/images/card/pp3.svg",
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
      image: "../assets/images/card/pp2.svg",
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
      image: "../assets/images/card/pp1.svg",
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
      image: "../assets/images/card/pp3.svg",
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
      image: "../assets/images/card/pp2.svg",
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
      image: "../assets/images/card/pp3.svg",
    },
  ]);

  return (
    <TripContext.Provider value={{ trips, setTrips }}>
      {children}
    </TripContext.Provider>
  );
};

// Custom Hook to use Trip Context
export const useTrips = () => {
  return useContext(TripContext);
};
