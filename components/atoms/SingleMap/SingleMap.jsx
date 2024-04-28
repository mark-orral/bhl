import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { MAP_MARKER } from "@/lib/utils/constants";

import styles from "./map.module.scss";

const SingleMap = ({ locations }) => {
  const [markers, setMarkers] = useState(locations);

  const options = {
    mapId: "e0ac2efad2d3a71c",
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    clickableIcons: false,
    panControl: false,
    gestureHandling: "none",
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  const renderedMarkers = (locations) => {
    return locations?.map(({ id, attributes: location }) => {
      return location?.lat && location?.lng ? (
        <MarkerF
          key={id}
          title={location.name}
          icon={{
            path: MAP_MARKER,
            fillColor: "black",
            fillOpacity: 1,
            scale: 0.5,
            anchor: {
              x: 35,
              y: 70,
            },
          }}
          position={{
            lat: Number(location?.lat),
            lng: Number(location?.lng),
          }}
          clickable={false}
        ></MarkerF>
      ) : null;
    });
  };

  const renderedMap = () => {
    return (
      <GoogleMap
        mapContainerClassName={styles.component}
        zoom={13}
        center={{
          lat: Number(locations[0]?.attributes?.lat),
          lng: Number(locations[0]?.attributes?.lng),
        }}
        options={options}
      >
        {renderedMarkers(markers)}
      </GoogleMap>
    );
  };

  if (loadError) {
    console.error("Map failed to load");
    return <></>;
  }

  return isLoaded ? renderedMap() : <></>;
};

export default SingleMap;
