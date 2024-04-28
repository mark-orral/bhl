import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

import Button from "@/components/atoms/Button";

import "react-day-picker/dist/style.css";
import styles from "./date-filter.module.scss";

const icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      viewBox="0 0 24 23"
      className={styles.icon}
    >
      <g transform="translate(-1350.411 -133.101)">
        <g
          transform="translate(1350.411 133.101)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        >
          <rect width="24" height="23" stroke="none" />
          <rect x="0.5" y="0.5" width="23" height="22" fill="none" />
        </g>
        <line
          x2="23.51"
          transform="translate(1350.475 138.978)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        />
        <line
          x2="23.51"
          transform="translate(1350.475 144.605)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        />
        <line
          x2="23.51"
          transform="translate(1350.475 150.232)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        />
        <line
          y1="16.88"
          transform="translate(1356.177 138.978)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        />
        <line
          y1="16.88"
          transform="translate(1362.549 138.978)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        />
        <line
          y1="16.88"
          transform="translate(1368.284 138.978)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        />
      </g>
    </svg>
  );
};

const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = searchParams.get("from")
    ? new Date(searchParams.get("from"))
    : null;
  const to = searchParams.get("to") ? new Date(searchParams.get("to")) : null;

  const [isActive, setIsActive] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    from: from,
    to: to,
  });

  const [, page, category] = pathname.split("/");

  const url =
    (typeof category !== "number" && !isNaN(category)) || category === undefined
      ? `/${page}/all`
      : `/${page}/${category}`;

  const handleDateFiltering = () => {
    selectedDates?.from && selectedDates?.from !== null
      ? router.push({
          pathname: url,
          query: {
            from: format(selectedDates?.from, "yyyy-MM-dd"),
            to: selectedDates?.to
              ? format(selectedDates?.to, "yyyy-MM-dd")
              : format(selectedDates?.from, "yyyy-MM-dd"),
          },
        })
      : router.push(pathname);
    setIsActive(!isActive);
  };

  return (
    <>
      <Button
        className={styles.component_button}
        onClick={() => setIsActive(!isActive)}
      >
        {!isActive ? "Calendar" : "Close"}
        {icon()}
      </Button>

      {isActive && (
        <>
          <div
            className={styles.component_datepicker_overlay}
            onClick={() => setIsActive(false)}
          />
          <div className={styles.component_datepicker}>
            <DayPicker
              mode="range"
              selected={selectedDates}
              onSelect={setSelectedDates}
              showOutsideDays
              className={styles.component_datepicker_calendar}
            />
            <Button
              className={`${styles.component_button} ${styles.component_datepicker_submit}`}
              onClick={handleDateFiltering}
            >
              Show Results
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default DateFilter;
