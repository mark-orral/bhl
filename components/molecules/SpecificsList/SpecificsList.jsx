import styles from "./specifics-list.module.scss";

const SpecificsList = ({ items }) => {
  return (
    <ul className={styles.element}>
      {items.map((item, i) => {
        return (
          <li key={i}>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SpecificsList;
