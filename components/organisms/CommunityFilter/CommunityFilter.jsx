import CategoryFilter from "@/components/molecules/CategoryFilter";
import DateFilter from "@/components/molecules/DateFilter";

import styles from "./community-filter.module.scss";

const CommunityFilter = ({ categories }) => {
  return (
    <div className={styles.component}>
      <CategoryFilter path="community" categories={categories} />
      <DateFilter />
    </div>
  );
};

export default CommunityFilter;
