import { format } from "date-fns";
import SinglePageSection from "../SinglePageSection";
import styles from "./single-date.module.scss";

const SingleDate = (props) => {
  return (
    <SinglePageSection
      flex
      border
      heading="Date"
      component={<DateTime {...props} />}
    />
  );
};

const DateTime = ({ date_start, events_meta }) => {
  const date = new Date(date_start);
  const [h, m] = events_meta.time.split(":");

  date.setHours(h);
  date.setMinutes(m);
  const startDate = format(date, "d MMMM h:mmaaa");

  return (
    <div className={styles.item}>
      <div>
        {startDate} - {events_meta.occurrence}
      </div>
    </div>
  );
};

export default SingleDate;
