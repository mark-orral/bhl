import styles from "./card.module.scss";

const Features = ({ title, description }) => {
  return (
    <ul className={styles.features}>
      {title && <li>{title}</li>}
      {description && (
        <li>
          {description[0] && <span>{description[0]}</span>}
          {description[1] && <span>{description[1]}</span>}
        </li>
      )}
    </ul>
  );
};

export { Features };
