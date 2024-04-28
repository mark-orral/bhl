import styles from "./results-counter.module.scss";

const ResultsCounter = ({ count }) => {
  return <div className={styles.component}>{count || 0} Results</div>;
};

export default ResultsCounter;
