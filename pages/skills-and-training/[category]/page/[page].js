import Page from "@/components/common/Page";

import getPosts from "@/lib/services/strapi/posts/getPosts";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";

import Resources from "@/components/templates/Resources";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

const route = "/skills-and-training/";

const ResourcesCategoryArchivePagination = ({
  page,
  posts,
  categories,
  pagination,
}) => {
  const category = page.slug;

  return (
    <Page seo={page.seo}>
      <Resources
        posts={posts}
        categories={categories}
        pagination={{
          ...pagination,
          path: (page) => `${route}${category}/page/${page}`,
        }}
      />
    </Page>
  );
};

export default ResourcesCategoryArchivePagination;

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
    data: posts,
    meta: { pagination },
  } = await getPosts(currentPage, null, filters);

  const Category = category.charAt(0).toUpperCase() + category.slice(1);

  //! Need to fetch single post data including SEO information
  const page = {
    title: `Skills &amp; Training ${Category}`,
    slug: category,
    seo: {
      title: `Skills &amp; Training | ${Category}`,
      description: "",
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
    props: { page, posts, categories, footerCategories, pagination },
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { slug: "notices" } },
//       { params: { slug: "events" } },
//       { params: { slug: "jobs" } },
//       { params: { slug: "news" } },
//     ],
//     fallback: false,
//   };
// }
