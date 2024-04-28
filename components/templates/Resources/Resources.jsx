import Container from "@/components/atoms/Container";
import StandardFilter from "@/components/organisms/StandardFilter";
import Results from "@/components/templates/Results";
import Pagination from "@/components/molecules/Pagination";

import useResources from "@/lib/hooks/useResources";
import SinglePageText from "@/components/molecules/SinglePageText";
import NewsletterForm from "@/components/organisms/NewsletterForm";
import BackButton from "@/components/molecules/BackButton";

const Resources = ({ posts, categories, pagination, description }) => {
  const cards = useResources(posts);
  return (
    <>
      <BackButton />
      <Container type="filter">
        <StandardFilter categories={categories} path={"skills-and-training"} />
        {description && <SinglePageText>{description}</SinglePageText>}

        <Results
          list={cards}
          noResultsMessage="Sorry, there are currently no resources available that match your search. Check back soon."
        />
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pageCount}
          path={pagination.path}
        />
      </Container>
      <NewsletterForm />
    </>
  );
};

export default Resources;
