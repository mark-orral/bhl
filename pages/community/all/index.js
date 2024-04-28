import Page from "@/components/common/Page";

import pages from "@/lib/data/pages/pages.json";
import getPosts from "@/lib/services/strapi/posts/getPosts";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";

import Community from "@/components/templates/Community";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

const CommunityArchive = ({ page, posts, categories, pagination }) => {
  return (
    <Page seo={page.seo}>
      <Community
        posts={posts}
        categories={categories}
        pagination={{
          ...pagination,
          path: (page) => `/community/all/page/${page}`,
        }}
      />
    </Page>
  );
};

export default CommunityArchive;

export async function getServerSideProps({ params, query }) {
  //! Replace dummy page data with real page data from Strapi
  const page = pages.find((page) => page.slug === "community");
  const currentPage = params?.page ? Number(params?.page[0]) || 1 : null;

  const redirectDestination =
    query?.from && query?.to
      ? `/community/all?from=${query.from}&to=${query.to}`
      : "/community/all";

  const filters = {
    $and: [
      {
        date_start: { $lte: query?.to },
      },
      {
        date_end: { $gte: query?.from },
      },
    ],
  };

  const {
    data: posts,
    meta: { pagination },
  } = await getPosts(currentPage, 10, filters);

  if (!page) {
    return {
      notFound: true,
    };
  }

  if (currentPage === 1) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: true,
      },
    };
  }

  const eventsCategoryData = getPostCategories();
  const spacesCategoryData = getSpacesCategories();
  const resourcesCategoryData = getResourcesCategories();

  const [eventsCategories, spacesCategories, resourcesCategories] =
    await Promise.all([
      eventsCategoryData,
      spacesCategoryData,
      resourcesCategoryData,
    ]);

  const footerCategories = {
    community: eventsCategories || null,
    spaces: spacesCategories || null,
    resources: resourcesCategories || null,
  };

  const categories = await eventsCategories;

  return {
    props: { page, posts, categories, footerCategories, pagination },
  };
}
