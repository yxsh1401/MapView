import React, { useState, useEffect, useContext } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";
// import truckIcon from "../assets/images/ttruck.png"; 
import truckIcon from "../assets/images/truck.png"; 
import TripInfoCard from "./TripInfoCard"; // Import the Trip Info Card
import { RouteContext } from "../context/RouteContext";


const TruckMarker = ({ waypoints, isActive, trip, onEnd }) => {
  const { routeProgress, setRouteProgress } = useContext(RouteContext);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [showTripInfo, setShowTripInfo] = useState(false);

  useEffect(() => {
    if (!isActive || waypoints.length === 0) {
      setMarkerPosition(null);
      setRouteProgress(0);
      return;
    }

    setMarkerPosition(waypoints[0]); // Start at first waypoint

    const interval = setInterval(() => {
      setCurrentWaypointIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < waypoints.length) {
          setMarkerPosition(waypoints[nextIndex]);
          setRouteProgress(((nextIndex + 1) / waypoints.length) * 100); // Move to next waypoint
          return nextIndex;
        } else {
          clearInterval(interval);
          setRouteProgress(100);
          if (onEnd) onEnd();
          return prevIndex;
        }
      });
    }, 2000); // Moves every 2 seconds

    return () => clearInterval(interval);
  }, [waypoints, isActive, setRouteProgress]);

  if (!isActive || !markerPosition) return null;

  return (
    <>
      <Marker
        position={markerPosition}
        icon={{
          url: truckIcon,
          scaledSize: new window.google.maps.Size(60, 60),
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
          <TripInfoCard trip={trip} />
        </OverlayView>
      )}
    </>
  );
};

export default TruckMarker;
