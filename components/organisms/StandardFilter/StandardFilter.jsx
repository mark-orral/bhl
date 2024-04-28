import CategoryFilter from "@/components/molecules/CategoryFilter";

import styles from "./standard-filter.module.scss";

const StandardFilter = ({ categories, path }) => {
  return (
    <div className={styles.component}>
      <CategoryFilter path={path} categories={categories} />
    </div>
  );
};

export default StandardFilter;
