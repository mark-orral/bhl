import { useState } from "react";

import Container from "@/components/atoms/Container";
import DirectoryFilters from "@/components/organisms/DirectoryFilters";
import DropdownCategoryFilter from "@/components/molecules/DropdownCategoryFilter";
import Results from "@/components/templates/Results";
import Heading from "@/components/atoms/Heading";
import ResultsCounter from "@/components/atoms/ResultsCounter";
import Pagination from "@/components/molecules/Pagination";
import MapViewer from "@/components/molecules/MapViewer";
import BackButton from "@/components/molecules/BackButton";

import useCompanies from "@/lib/hooks/useCompanies";
import RegisterForm from "@/components/organisms/RegisterForm";
import styles from "./directory.module.scss";
import AlphabetFilter from "@/components/molecules/AlphabetFilter/AlphabetFilter";
const Directory = ({ companies, locations, categories, pagination }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const cards = useCompanies(companies);

  return (
    <>
      <BackButton />
      <Container
        type='filter'
        className={styles.container}
      >
        <DirectoryFilters>
          <DropdownCategoryFilter
            categories={categories}
            onChange={(category) => setSelectedCategory(category?.name)}
          />
        </DirectoryFilters>

        <MapViewer locations={locations} />
        <Container className={styles.results_container}>
          <Results
            list={cards}
            noResultsMessage='Sorry, there are currently no companies available that match your search. Check back soon.'
          >
            <Heading>{selectedCategory || "All"}</Heading>
            <ResultsCounter count={pagination?.total} />
          </Results>
          <AlphabetFilter active={"B"} />
        </Container>

        <Pagination
          currentPage={pagination?.page}
          totalPages={pagination?.pageCount}
          path={pagination?.path}
        />
      </Container>
      <RegisterForm
        type={"content"}
        category={"business"}
      />
    </>
  );
};

export default Directory;
