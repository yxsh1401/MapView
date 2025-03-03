import React, { useRef, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

function Map() {
    const center = { lat: 12.9352, lng: 77.6245 };

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Ensure this key is correct
        libraries: ['places'], // Optional: Needed for autocomplete or directions
    });

    const [directionResponse, setDirectionRespose] =useState(null)
    // Define refs OUTSIDE of conditional rendering
    const originRef = useRef(null);
    const destinationRef = useRef(null);

    // Prevent hook errors
    if (!isLoaded) {
        return <p>Loading Map...</p>;
    }

    async function calculateRoute(){
      if(originRef.current.value==="" || destinationRef.current.value===""){
        return
      }
      const directionService = new google.maps.DirectionsService()
      const results = await directionService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING
      })
      setDirectionRespose(results)
    }

    return (
        <div className='absolute bottom-0 right-0 w-[1075px] h-[635px] rounded-lg shadow-lg overflow-hidden'>
            {/* Input Fields */}
            <div className='p-4 bg-white shadow-md rounded-lg absolute top-2 left-2 z-10'>
              <Autocomplete>
                <input type='text' ref={originRef} placeholder='Origin' className='border p-2 m-2 rounded-md' />
              </Autocomplete>
              <Autocomplete>
                <input type='text' ref={destinationRef} placeholder='Destination' className='border p-2 m-2 rounded-md' />
              </Autocomplete>
                <button className='border-1 rounded-md p-1 bg-amber-300 hover:bg-green-600' onClick={calculateRoute}>Calculate</button>
            </div>

            {/* Google Map */}
            <GoogleMap
                id="google-map"
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                {/* Marker at Center */}
                {/* <Marker position={center} /> */}
                {directionResponse && <DirectionsRenderer directions={directionResponse}/>}
            </GoogleMap>
        </div>
    );
}

export default Map;
