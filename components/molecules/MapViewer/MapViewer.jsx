import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Map from "@/components/atoms/Map";
import Button from "@/components/atoms/Button";

import styles from "./map-viewer.module.scss";

const MapViewer = ({ locations }) => {
  const searchParams = useSearchParams();
  const searchView = searchParams.get("view");
  const [currentView, setCurrentView] = useState(searchView || "list");

  const view = currentView === "list" ? "map" : "list";

  return (
    <section className={styles.component}>
      {currentView === "map" && (
        <div className={styles.map_container}>
          <Map locations={locations} />
        </div>
      )}
      <div className={styles.button_container}>
        <Button
          className={styles.component_button}
          onClick={() => setCurrentView(view)}
        >
          View as {view}
        </Button>
      </div>
    </section>
  );
};

export default MapViewer;
