import React, { useState, useEffect, useContext } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";
import truckIcon from "../assets/images/truck.png";
import TripInfoCard from "./TripInfoCard";
import { RouteContext } from "../context/RouteContext";

const TruckMarker = ({ waypoints, isActive, trip, onEnd }) => {
  const { setRouteProgress } = useContext(RouteContext);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [showTripInfo, setShowTripInfo] = useState(false);

  useEffect(() => {
    if (!isActive || waypoints.length === 0) {
      setMarkerPosition(null);
      setRouteProgress(0);
      return;
    }

    setMarkerPosition(waypoints[0]); // Start at the first waypoint
    console.log("Starting Position:", waypoints[0]);

    let animationFrameId;

    const moveTruck = (start, end, duration) => {
  let startTime = performance.now();

  const animate = (currentTime) => {
    let elapsedTime = currentTime - startTime;
    let progress = elapsedTime / duration;

    if (progress > 1) progress = 1;

    let lat = start.lat() + (end.lat() - start.lat()) * progress;
    let lng = start.lng() + (end.lng() - start.lng()) * progress;

    let newPosition = { lat, lng };
    setMarkerPosition(newPosition);

    // Update trip progress
    let totalWaypoints = waypoints.length;
    let completedPercentage =
      ((currentWaypointIndex + progress) / totalWaypoints) * 100;
    setRouteProgress(completedPercentage);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      setCurrentWaypointIndex((prevIndex) => prevIndex + 1);
    }
  };

  animationFrameId = requestAnimationFrame(animate);
};

    const moveToNextWaypoint = () => {
      console.log("Waypoints:", waypoints); // Log all waypoints
      console.log("Current index:", currentWaypointIndex);
      console.log("Current waypoint:", waypoints[currentWaypointIndex]);
    
      if (
        currentWaypointIndex < waypoints.length - 1 &&
        waypoints[currentWaypointIndex] &&
        waypoints[currentWaypointIndex + 1]
      ) {
        console.log("Next waypoint:", waypoints[currentWaypointIndex + 1]);
    
        moveTruck(
          waypoints[currentWaypointIndex],
          waypoints[currentWaypointIndex + 1],
          2000 // Smooth transition over 2 seconds
        );
      } else {
        console.warn("No valid next waypoint. Ending trip.");
        setRouteProgress(100);
        if (onEnd) onEnd();
      }
    };
    moveToNextWaypoint();

    return () => cancelAnimationFrame(animationFrameId);
  }, [waypoints, isActive, setRouteProgress, currentWaypointIndex]);

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
        onClick={() => setShowTripInfo((prev) => !prev)}
      />

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
