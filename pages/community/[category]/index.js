import Page from "@/components/common/Page";

import getPosts from "@/lib/services/strapi/posts/getPosts";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";

import Community from "@/components/templates/Community";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

const CommunityCategoryArchive = ({ page, posts, categories, pagination }) => {
  const category = page.slug;

  return (
    <Page seo={page.seo}>
      <Community
        posts={posts}
        categories={categories}
        pagination={{
          ...pagination,
          path: (page) => `/community/${category}/page/${page}`,
        }}
      />
    </Page>
  );
};

export default CommunityCategoryArchive;

export async function getServerSideProps({ params, query }) {
  const category = params?.category;
  const currentPage = query?.page ? Number(query?.page) : null;

  const redirectDestination =
    query?.from && query?.to
      ? `/community/${category}?from=${query.from}&to=${query.to}`
      : `/community/${category}`;

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
    title: `Community ${Category}`,
    slug: category,
    seo: {
      title: `Community | ${Category}`,
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

  const categories = await eventsCategories;

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
