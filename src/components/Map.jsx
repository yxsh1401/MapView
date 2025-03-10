import React, { useContext } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";
import TruckMarker from "./TruckMarker";
import start from "../assets/images/start.png"
import end from "../assets/images/end.png"
import { RouteContext } from "../context/RouteContext"; // Import context
// import midpointIcon from '../assets/images/midpoints.png'

const libraries = ["places"];

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  console.log("Rendering Map Component");

  const { directionResponse, waypoints, mapCenter, routes } =
    useContext(RouteContext);

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
        url: start, // Custom start icon
        scaledSize: new window.google.maps.Size(40, 40), // Adjust size
      }}
    />

    {/* Custom End Marker */}
    <Marker
      position={directionResponse.routes[0].legs[0].end_location}
      icon={{
        url: end, // Custom end icon
        scaledSize: new window.google.maps.Size(40, 40), // Adjust size
      }}
    />


    {/* DirectionsRenderer with Custom Route Color */}
    <DirectionsRenderer
      directions={directionResponse}
      options={{
        polylineOptions: {
          strokeColor: "#28A34C", // Custom color
          strokeOpacity: 0.8, // Adjust opacity
          strokeWeight: 5, // Adjust thickness
        },
        suppressMarkers: true,
      }}
    />
  </>
)}
        <TruckMarker waypoints={waypoints} isActive={waypoints.length > 0} />
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
