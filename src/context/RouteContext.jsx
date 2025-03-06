import { createContext, useState, useEffect, useMemo } from "react";

export const RouteContext = createContext();

export function RouteProvider({ children }) {
    const [activeRoute, setActiveRoute] = useState(null);
    const [directionResponse, setDirectionResponse] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [mapCenter, setMapCenter] = useState(null);

    // Predefined routes
    const routes = useMemo(() => [
        [{ lat: 12.9352, lng: 77.6245 }, { lat: 12.9716, lng: 77.5946 }],
        [{ lat: 12.9141, lng: 74.856 }, { lat: 10.1632, lng: 76.6413 }],
        [{ lat: 19.076, lng: 72.8777 }, { lat: 15.2993, lng: 74.124 }]
    ], []);

    useEffect(() => {
        if (activeRoute !== null) {
            const directionService = new google.maps.DirectionsService();
            directionService.route(
                {
                    origin: routes[activeRoute][0],
                    destination: routes[activeRoute][1],
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirectionResponse(result);
                        const steps = result.routes[0].legs[0].steps;
                        let extractedWaypoints = steps.map(step => step.start_location);
                        extractedWaypoints.push(steps[steps.length - 1].end_location);
                        setWaypoints(extractedWaypoints);
                        setMapCenter(extractedWaypoints[0]);
                    } else {
                        console.error("Could not retrieve route");
                    }
                }
            );
        } else {
            setDirectionResponse(null);
            setWaypoints([]);
            setMapCenter(null);
        }
    }, [activeRoute, routes]);

    return (
        <RouteContext.Provider value={{ activeRoute, setActiveRoute, directionResponse, waypoints, mapCenter, routes }}>
            {children}
        </RouteContext.Provider>
    );
}
