import styles from "./card.module.scss";

const Body = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};

export { Body };
