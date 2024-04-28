import Page from "@/components/common/Page";

import pages from "@/lib/data/pages/pages.json";
import getSpaces from "@/lib/services/strapi/spaces/getSpaces";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

import Spaces from "@/components/templates/Spaces";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

const route = "/spaces/all";

const SpacesArchive = ({ page, spaces, categories, pagination }) => {
  return (
    <Page seo={page.seo}>
      <Spaces
        posts={spaces}
        categories={categories}
        pagination={{
          ...pagination,
          path: (page) => `${route}/page/${page}`,
        }}
      />
    </Page>
  );
};

export default SpacesArchive;

export async function getServerSideProps({ params, query }) {
  //! Replace dummy page data with real page data from Strapi
  const page = pages.find((page) => page.slug === "spaces");
  const currentPage = params?.page ? Number(params?.page[0]) || 1 : null;

  const redirectDestination =
    query?.from && query?.to
      ? `${route}?from=${query.from}&to=${query.to}`
      : `${route}`;

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

  const { data: spaces, meta } = await getSpaces(currentPage, 10, filters);

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

  const categories = spacesCategories;

  return {
    props: {
      page,
      spaces,
      categories,
      footerCategories,
      pagination: meta?.pagination || 0,
    },
  };
}
