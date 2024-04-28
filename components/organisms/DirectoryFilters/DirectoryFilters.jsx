import SearchBar from "@/components/molecules/SearchBar";
// import AlphabetFilter from "@/components/molecules/AlphabetFilter/AlphabetFilter";

import styles from "./directory-filters.module.scss";

//! Fetch all categories and filter out those with no businesses attached
//! Add alphabetical filter and pass through to Strapi filtering using $startsWith
//! Add business logic for handling each filter

const DirectoryFilters = ({ children }) => {
  return (
    <section className={styles.component}>
      {children}
      <SearchBar />
      {/* <AlphabetFilter /> */}
    </section>
  );
};

export default DirectoryFilters;
