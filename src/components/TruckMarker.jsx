import React, { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import truckIcon from "../assets/images/ttruck.png"; // Replace with the correct image path

const TruckMarker = ({ waypoints, isActive, onEnd }) => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);

    useEffect(() => {
        if (!isActive || waypoints.length === 0) {
            setMarkerPosition(null); // Hide truck when route is hidden
            return;
        }

        setMarkerPosition(waypoints[0]); // Start at first waypoint

        const interval = setInterval(() => {
            setCurrentWaypointIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex < waypoints.length) {
                    setMarkerPosition(waypoints[nextIndex]); // Move to next waypoint
                    return nextIndex;
                } else {
                    clearInterval(interval);
                    if (onEnd) onEnd(); // Call when the truck reaches the destination
                    return prevIndex;
                }
            });
        }, 2000); // Moves every 2 seconds

        return () => clearInterval(interval);
    }, [waypoints, isActive]);

    // Hide marker when route is hidden
    if (!isActive || !markerPosition) return null;

    return (
        <Marker
            position={markerPosition}
            icon={{
                url: truckIcon,
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 20),
            }}
        />
    );
};

export default TruckMarker;
