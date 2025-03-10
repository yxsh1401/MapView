    import React, { useEffect, useRef } from "react";
    import { FaPhone, FaWhatsapp } from "react-icons/fa";

    const TripInfoCard = ({ trip, onClose }) => {
    const cardRef = useRef(null); // Reference for the card

    useEffect(() => {
        // Function to detect clicks outside the card
        const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            onClose(); // Close the card when clicking outside
        }
        };

        // Add event listener when the card is mounted
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
        // Cleanup event listener when the component unmounts
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
        ref={cardRef} // Attach ref to card
        className="absolute top-10 left-10 bg-white p-4 rounded-lg shadow-lg w-[350px]"
        >
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Trip Id: {trip.id}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✖
            </button>
        </div>

        <div className="flex items-center mt-2">
            <img src={trip.image} alt="Driver" className="w-10 h-10 rounded-full" />
            <div className="ml-3">
            <p className="font-bold">{trip.driver}</p>
            <p className="text-gray-500">{trip.vehicleNumber}</p>
            </div>
        </div>

        <p className="text-gray-500 mt-2">{trip.dateTime}</p>

        <div className="border-t my-2"></div>

        <div className="text-sm">
            <p className="font-bold">🚛 Transporter</p>
            <p className="text-gray-600">{trip.company}</p>

            <p className="font-bold mt-2">🛒 Customer</p>
            <p className="text-gray-600">{trip.customer || "N/A"}</p>

            <div className="flex justify-between mt-2">
            <p className="text-sm">
                <strong>Invoice No:</strong> {trip.invoiceNo || "N/A"}
            </p>
            <p className="text-sm">
                <strong>Shipment No:</strong> {trip.shipmentNo || "N/A"}
            </p>
            </div>

            <p className="text-sm">
            <strong>Order No:</strong> {trip.orderNo || "N/A"}
            </p>
        </div>

        <div className="flex justify-between items-center mt-3">
            <p className="font-bold text-green-600">Freight Cost: ₹{trip.freightCost || "N/A"}</p>
            <div className="flex gap-3">
            <FaWhatsapp className="text-green-500 cursor-pointer text-xl" />
            <FaPhone className="text-blue-500 cursor-pointer text-xl" />
            </div>  
        </div>
        </div>
    );
    };

    export default TripInfoCard;
