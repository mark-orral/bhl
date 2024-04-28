import format from "date-fns/format";

import styles from "./card.module.scss";

const Footer = ({ children, date, term, price }) => {
  return (
    <div className={styles.footer}>
      {children}
      {date && <span>{format(new Date(date), "d MMM")}</span>}
      {term && price && (
        <span>
          {term} £{price.toLocaleString("en-GB")}
        </span>
      )}
    </div>
  );
};

export { Footer };
