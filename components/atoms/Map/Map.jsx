import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { BLACKHORSE_LANE_COORDS, MAP_MARKER } from "@/lib/utils/constants";

import Loader from "@/components/atoms/Loader";
import Button from "@/components/atoms/Button";

import styles from "./map.module.scss";

const options = {
  mapId: "e0ac2efad2d3a71c",
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: false,
  clickableIcons: false,
};

const Map = ({ locations }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    setMarkers(locations);
  }, [locations]);

  const renderedMarkers = (locations) => {
    return locations?.map(({ id, attributes: location }) => {
      return location?.lat && location?.lng ? (
        <MarkerF
          key={id}
          icon={{
            path: MAP_MARKER,
            fillColor: "black",
            fillOpacity: 1,
            scale: 0.6,
            anchor: {
              x: 35,
              y: 70,
            },
          }}
          position={{
            lat: Number(location?.lat),
            lng: Number(location?.lng),
          }}
          onClick={() => handleActiveMarker(id)}
          title={location.name}
        >
          {activeMarker === id && (
            <div className={styles.component_infobox}>
              <Button
                className={styles.component_infobox_close}
                aria-label="close"
                onClick={() => setActiveMarker(null)}
              >
                close
              </Button>
              <h2 className={styles.component_infobox_name}>{location.name}</h2>
              <div className={styles.component_infobox_address}>
                {location.address}
              </div>
              <div className={styles.component_infobox_link}>
                <a href={`/company/${location.slug}`}>View {location.name}</a>
              </div>
            </div>
          )}
        </MarkerF>
      ) : null;
    });
  };

  const renderedMap = () => {
    return (
      <GoogleMap
        mapContainerClassName={styles.component}
        zoom={15}
        center={BLACKHORSE_LANE_COORDS}
        options={options}
        onClick={() => setActiveMarker(null)}
      >
        {renderedMarkers(markers)}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderedMap() : <Loader />;
};

export default Map;
