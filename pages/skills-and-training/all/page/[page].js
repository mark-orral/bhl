import Page from "@/components/common/Page";

import pages from "@/lib/data/pages/pages.json";
import getResources from "@/lib/services/strapi/resources/getResources";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

import Resources from "@/components/templates/Resources";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

const route = "/skills-and-training/all";

const ResourcesArchivePagination = ({
  page,
  posts,
  categories,
  pagination,
}) => {
  return (
    <Page seo={{ title: page.seo.title, description: page.seo.description }}>
      <Resources
        posts={posts}
        categories={categories}
        pagination={{
          ...pagination,
          path: (page) => `${route}/page/${page}`,
        }}
      />
    </Page>
  );
};

export default ResourcesArchivePagination;

export async function getServerSideProps({ params, query }) {
  //! Replace dummy page data with real page data from Strapi
  const page = pages.find((page) => page.slug === "skills-and-training");
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

  const {
    data: resources,
    meta: { pagination },
  } = await getResources(currentPage, 10, filters);

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

  const categories = await resourcesCategories;

  return {
    props: { page, posts: resources, categories, footerCategories, pagination },
  };
}
