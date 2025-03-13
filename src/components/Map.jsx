import React, { useContext, useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import TruckMarker from "./TruckMarker";
import start from "../assets/images/start.png";
import end from "../assets/images/end.png";
import { RouteContext } from "../context/RouteContext";

const libraries = ["places"];

function Map({ trip }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  console.log("Rendering Map Component");

  const { directionResponse, waypoints, mapCenter, routes } =
    useContext(RouteContext);

  const [completedPath, setCompletedPath] = useState([]); // Stores traveled route

  useEffect(() => {
    if (waypoints.length > 0) {
      setCompletedPath([waypoints[0]]); // Initialize with starting point
    }
  }, [waypoints]);

  const handleTruckProgress = (currentPosition) => {
    setCompletedPath((prev) => [...prev, currentPosition]); // Append traveled positions
  };

  if (!isLoaded) {
    return <p>Loading Map...</p>;
  }

  return (
    <div className="fixed ml-[400px] w-[1085px] h-[635px] shadow-lg overflow-hidden">
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
        {directionResponse && (
          <>
            {/* Custom Start Marker */}
            <Marker
              position={directionResponse.routes[0].legs[0].start_location}
              icon={{
                url: start,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />

            {/* Custom End Marker */}
            <Marker
              position={directionResponse.routes[0].legs[0].end_location}
              icon={{
                url: end,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />

            {/* Completed Route (Colored) */}
            <Polyline
              path={completedPath}
              options={{
                strokeColor: "#28A34C", // Green for completed route
                strokeOpacity: 0.8,
                strokeWeight: 5,
              }}
            />

            {/* Remaining Route (Transparent) */}
            <Polyline
              path={waypoints}
              options={{
                strokeColor: "#28A34C",
                strokeOpacity: 0.8, // Transparent
                strokeWeight: 5,
              }}
            />
          </>
        )}

        <TruckMarker
          waypoints={waypoints}
          isActive={waypoints.length > 0}
          trip={trip}
          onProgress={handleTruckProgress} // Callback for progress tracking
        />
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
