import React, { useState, useEffect } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";
// import truckIcon from "../assets/images/ttruck.png"; 
import truckIcon from "../assets/images/car.png"; 
import TripInfoCard from "./TripInfoCard"; // Import the Trip Info Card


const TruckMarker = ({ waypoints, isActive, trip, onEnd }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [showTripInfo, setShowTripInfo] = useState(false);

  useEffect(() => {
    if (!isActive || waypoints.length === 0) {
      setMarkerPosition(null);
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
          if (onEnd) onEnd();
          return prevIndex;
        }
      });
    }, 2000); // Moves every 2 seconds

    return () => clearInterval(interval);
  }, [waypoints, isActive]);

  if (!isActive || !markerPosition) return null;

  return (
    <>
      <Marker
        position={markerPosition}
        icon={{
          url: truckIcon,
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        }}
        onClick={() => setShowTripInfo((prev) => !prev)} // Toggle info card
      />

      {/* Trip Info Card appears above truck */}
      {showTripInfo && (
        <OverlayView
          position={markerPosition}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <TripInfoCard trip={trip || {}} onClose={() => setShowTripInfo(false)} />
        </OverlayView>
      )}
    </>
  );
};

export default TruckMarker;
