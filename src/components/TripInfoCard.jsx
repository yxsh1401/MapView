    import React, { useEffect, useRef } from "react";
    import phone from "../assets/images/card/phone.svg";
    import whatsapp from "../assets/images/card/Whatsapp.svg";
    import share from "../assets/images/card/share.png";
    import bus from "../assets/images/card/infocard/bus.png";
    import cart from "../assets/images/card/infocard/cart.png";
    import ship from "../assets/images/card/infocard/ship.png";
    import invoice from "../assets/images/card/infocard/invoice.png";
    import cus from "../assets/images/card/infocard/cus.png";

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
        <div ref={cardRef} className="absolute top-10 left-10 bg-white p-[16px] rounded-lg shadow-lg w-[380px] h-[240px]">
           
            {/* Driver Details */}

            <div className="flex w-full">
                <img src={trip.image} alt="Driver" className="w-[48px] h-[48px] rounded-md" />
                <div className="ml-3 w-full">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-[12px] text-blue-700 font-bold cursor-pointer" onClick={() => window.history.pushState({}, "", "/Trip")}>Trip Id: {trip.id}</h2>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-900">{trip.dateTime}</p>
                            <p className="text-gray-400">{trip.time}</p>
                            <span className="w-3 h-3 bg-purple-200 rounded-full relative">
                                <span className="absolute inset-0 m-auto w-[7px] h-[6px] bg-purple-500 rounded-full"></span>
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between pt-1">
                        <div>
                            <p className="font-normal text-[12px]">{trip.driver}</p>
                            <p className="text-gray-500 text-[10px]">{trip.vehicleNumber}</p>
                        </div>
                        <div className="flex pr-1 pt-1 gap-2">
                            <img src={phone} alt="phone" className="w-[18px] h-[18px]"/>
                            <img src={whatsapp} alt="whatsapp" className="w-[18px] h-[18px]"/>
                            <img src={share} alt="whatsapp" className="w-[18px] h-[18px]"/>
                        </div>
                    </div>
                </div>  
            </div>

            <div className="border-t border-gray-300 my-2"></div>

            {/* Transporter and Customer */}

            <div className="">
                <div className="flex justify-between">
                    <div className="flex gap-1">
                        <div>
                            <img src={bus} className="w-[14px] h-[12px]"/>
                        </div>
                        <div>
                            <p className="font-normal text-[10px] text-gray-500"> Transporter</p>
                            <p className="text-gray-900">{trip.company}</p>
                        </div>
                    </div>
                    <div>
                        <img src={phone} alt="phone" className="w-[18px] h-[18px]"/>
                    </div>
                </div>

                <div className="flex justify-between pt-3">
                    <div className="flex gap-1">
                        <div>
                            <img src={cus} className="w-[14px] h-[12px]"/>
                        </div>
                        <div>
                            <p className="font-normal text-[10px] text-gray-500"> Customer</p>
                            <p className="text-gray-900">{trip.customer}</p>
                        </div>
                    </div>
                    <div>
                        <img src={phone} alt="phone" className="w-[18px] h-[18px]"/>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 my-2"></div>

            {/* Invoice Shipment Order */}

            <div className="flex gap-10">
                <div className="flex gap-1">
                    <div>
                        <img src={invoice} className="w-[12px] h-[12px]"/>
                    </div>
                    <div>
                        <p className="font-normal text-[10px] text-gray-500"> Invoice No</p>
                        <p className="text-gray-900 text-[12px] pt-1">{trip.invoice}</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <div>
                        <img src={ship} className="w-[12px] h-[12px]"/>
                    </div>
                    <div>
                        <p className="font-normal text-[10px] text-gray-500"> Shipment No</p>
                        <p className="text-gray-900 text-[12px] pt-1">{trip.ship}</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <div>
                        <img src={cart} className="w-[12px] h-[12px]"/>
                    </div>
                    <div>
                        <p className="font-normal text-[10px] text-gray-500"> Order No</p>
                        <p className="text-blue-700 underline text-[12px] pt-1">{trip.order}</p>
                    </div>
                </div>    
            </div>
                
            <div className="border-t border-gray-300 my-2"></div>

            {/* Freight Cost */}

            <div className="flex justify-between">
                <div>
                    <p className="font-bold text-gray-800 text-[12px]">Freight Cost</p>
                </div>
                <div>
                    <p className="font-bold text-green-600 text-[12px]">{trip.cost || "N/A"}  ₹</p>
                </div>
            </div>
            </div>
        );
        };

    export default TripInfoCard;
