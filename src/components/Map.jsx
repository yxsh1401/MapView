import React, { useState, useEffect, memo } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    DirectionsRenderer
} from "@react-google-maps/api";
import TruckMarker from "./TruckMarker"; // Import TruckMarker component

const libraries = ["places"];


function Map() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });
    console.log("Rendering Map Component");

    const [directionResponse, setDirectionResponse] = useState(null);
    const [activeRoute, setActiveRoute] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);

    // Predefined routes
    const routes = [
        [
            { lat: 12.9352, lng: 77.6245 }, // Example Start
            { lat: 12.9716, lng: 77.5946 } // Example Destination
        ],
        [
            { lat: 12.9141, lng: 74.856 },
            { lat: 10.1632, lng: 76.6413 }
        ],
        [
            { lat: 19.076, lng: 72.8777 },
            { lat: 15.2993, lng: 74.124 }
        ]
    ];

    const toggleRoute = (index) => {
        if (activeRoute === index) {
            setDirectionResponse(null);
            setWaypoints([]);
            setActiveRoute(null);
            setMapCenter(null);
        } else {
            const directionService = new google.maps.DirectionsService();
            directionService.route(
                {
                    origin: routes[index][0],
                    destination: routes[index][1],
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirectionResponse(result);
                        setActiveRoute(index);

                        // Extract waypoints from the route
                        const steps = result.routes[0].legs[0].steps;
                        let extractedWaypoints = steps.map(step => step.start_location);
                        extractedWaypoints.push(steps[steps.length - 1].end_location);

                        setWaypoints(extractedWaypoints);
                        setMapCenter(extractedWaypoints[0]); // Start truck at first waypoint
                    } else {
                        console.error("Could not retrieve route");
                    }
                }
            );
        }
    };

    if (!isLoaded) {
        return <p>Loading Map...</p>;
    }

    return (
        <div className="fixed ml-[400px] w-[1085px] h-[635px]  shadow-lg overflow-hidden">
            <div className="p-4 bg-white shadow-md rounded-lg absolute bottom-2 right-2 z-10">
                {routes.map((_, index) => (
                    <button
                        key={index}
                        className="border-1 rounded-md p-2 m-1 bg-amber-300 hover:bg-green-600"
                        onClick={() => toggleRoute(index)}
                    >
                        {activeRoute === index
                            ? `Hide Route ${index + 1}`
                            : `Show Route ${index + 1}`}
                    </button>
                ))}
            </div>

            <GoogleMap
                id="google-map"
                center={mapCenter || routes[0][0]}
                zoom={10}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                {directionResponse && <DirectionsRenderer directions={directionResponse} />}

                
                <TruckMarker 
                    waypoints={waypoints} 
                    isActive={activeRoute !== null} 
                    onEnd={() => console.log("Truck reached destination!")} 
                />
            </GoogleMap>
        </div>
    );
}

export default React.memo(Map);
