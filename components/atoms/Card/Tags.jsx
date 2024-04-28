import styles from "./card.module.scss";

const Tags = ({ category, business, share, occurance }) => {
  return (
    <div className={styles.tags}>
      <div>
        {`${
          occurance
            ? occurance + " " + category.slice(0, category?.length - 1)
            : category
        }`}
      </div>
      {business && <div>{business}</div>}
      {share && <div className={styles.share}>Share</div>}
    </div>
  );
};

export { Tags };
