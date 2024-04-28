import { format } from "date-fns";

import styles from "./date-time-list.module.scss";

const DateTimeList = ({ dates }) => {
  return dates ? (
    <div className={styles.component}>
      {dates.map((date, index) => {
        const startDate = format(new Date(date?.date_start), "d MMMM");
        const startTime = format(new Date(date?.date_start), "h:mmaaa");
        const endDate = format(new Date(date?.date_end), "d MMMM");
        const endTime = format(new Date(date?.date_end), "h:mmaaa");

        return (
          <div
            className={styles.item}
            key={date?.date_start + date?.date_end + index}
          >
            <div>
              {startDate} - {endDate}
            </div>
            <div>
              .................................................................................................................................................................................................................................................................
            </div>
            <div>
              {startTime} - {endTime}
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default DateTimeList;
