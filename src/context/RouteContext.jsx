import { createContext, useContext, useState } from "react";

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
    const [activeRoute, setActiveRoute] = useState(null);
    const [directionResponse, setDirectionResponse] = useState(null);
    const [polylinePath, setPolylinePath] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);
    

    const routes = [
        [{ lat: 12.9352, lng: 77.6245 }, { lat: 12.9716, lng: 77.5946 }],
        [{ lat: 12.9141, lng: 74.856 }, { lat: 10.1632, lng: 76.6413 }],
        [{ lat: 19.076, lng: 72.8777 }, { lat: 15.2993, lng: 74.124 }]
    ];

    const toggleRoute = (index) => {
        if (typeof google === "undefined" || !google.maps) {
            console.error("Google Maps API is not loaded yet.");
            return;
        }

        if (activeRoute === index) {
            // Reset if the same route is clicked again
            setDirectionResponse(null);
            setPolylinePath([]);
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
                        const path = result.routes[0]?.overview_path?.map(point => ({
                            lat: point.lat(),
                            lng: point.lng(),
                        })) || [];

                        setDirectionResponse(result);
                        setPolylinePath(path);
                        setActiveRoute(index);

                        if (path.length > 0) {
                            setMapCenter(path[0]);
                        }
                    } else {
                        console.error("Could not retrieve route:", status);
                        setDirectionResponse(null);
                        setPolylinePath([]);
                        setActiveRoute(null);
                        setMapCenter(null);
                    }
                }
            );
        }
    };

    return (
        <RouteContext.Provider value={{ activeRoute, toggleRoute, directionResponse, polylinePath, mapCenter }}>
            {children}
        </RouteContext.Provider>
    );
};

export const useRoute = () => useContext(RouteContext);