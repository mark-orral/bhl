import Container from "@/components/atoms/Container";
import CommunityFilter from "@/components/organisms/CommunityFilter";
import Results from "@/components/templates/Results";
import Pagination from "@/components/molecules/Pagination";
import BackButton from "@/components/molecules/BackButton";

import usePosts from "@/lib/hooks/usePosts";

const Community = ({ posts, categories, pagination }) => {
  const cards = usePosts(posts);

  return (
    <>
      <BackButton />
      <Container type="filter">
        <CommunityFilter categories={categories} />

        <Results
          list={cards}
          noResultsMessage="Sorry, there are currently no posts available that match your search. Check back soon."
        />

        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pageCount}
          path={pagination.path}
        />
      </Container>
    </>
  );
};

export default Community;
