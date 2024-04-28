import Page from "@/components/common/Page";

import getResources from "@/lib/services/strapi/resources/getResources";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

import Resources from "@/components/templates/Resources";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

const route = "/skills-and-training/";

const ResourcesCategoryArchive = ({
  page,
  resources,
  categories,
  pagination,
}) => {
  const category = page.slug;

  return (
    <Page seo={page.seo}>
      <Resources
        posts={resources}
        categories={categories}
        pagination={{
          ...pagination,
          path: (page) => `${route}${category}/page/${page}`,
        }}
      />
    </Page>
  );
};

export default ResourcesCategoryArchive;

export async function getServerSideProps({ params, query }) {
  const category = params?.category;
  const currentPage = query?.page ? Number(query?.page) : null;

  const redirectDestination =
    query?.from && query?.to
      ? `${route}${category}?from=${query.from}&to=${query.to}`
      : `${route}${category}`;

  const filters = {
    category: {
      slug: {
        $eq: category,
      },
    },
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
  } = await getResources(currentPage, null, filters);

  const Category = category.charAt(0).toUpperCase() + category.slice(1);

  //! Need to fetch single post data including SEO information
  const page = {
    title: `Skills &amp; Training ${Category}`,
    slug: category,
    seo: {
      title: `Skills &amp; Training | ${Category}`,
      description: "",
      robots: {
        index: "index",
        follow: "follow",
      },
    },
  };

  //* Example of how to render 404 on static pages
  if (!category) {
    return {
      notFound: true,
    };
  }

  if (currentPage === (1 || null)) {
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

  //* This will be passed to the page component as props
  return {
    props: { page, resources, categories, footerCategories, pagination },
  };
}
