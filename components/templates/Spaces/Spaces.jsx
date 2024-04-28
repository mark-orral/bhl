import Container from "@/components/atoms/Container";
import StandardFilter from "@/components/organisms/StandardFilter";
import Results from "@/components/templates/Results";
import Pagination from "@/components/molecules/Pagination";

import useSpaces from "@/lib/hooks/useSpaces";
import ResultsCounter from "@/components/atoms/ResultsCounter";
import BackButton from "@/components/molecules/BackButton";

const Spaces = ({ posts, categories, pagination, count }) => {
  const cards = useSpaces(posts);

  return (
    <>
      <BackButton />
      <Container type="filter">
        <StandardFilter categories={categories} path={"spaces"} />
        <Results
          list={cards}
          noResultsMessage="Sorry, there are currently no spaces available that match your search. Check back soon."
        >
          <ResultsCounter count={pagination?.total} />
        </Results>

        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pageCount}
          path={pagination.path}
        />
      </Container>
    </>
  );
};

export default Spaces;
