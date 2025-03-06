import React, { useContext } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import TruckMarker from "./TruckMarker";
import { RouteContext } from "../context/RouteContext"; // Import context

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
          <DirectionsRenderer directions={directionResponse} />
        )}
        <TruckMarker waypoints={waypoints} isActive={waypoints.length > 0} />
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
