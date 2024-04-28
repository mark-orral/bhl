import Page from "@/components/common/Page";
import { Single } from "@/components/templates/Spaces";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

import getSpaceBySlug from "@/lib/services/strapi/spaces/getSpaceBySlug";
import getSpaces from "@/lib/services/strapi/spaces/getSpaces";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

const SpacesSinglePage = ({ page, posts }) => {
  return (
    <Page seo={page.seo}>
      <Single
        page={page}
        posts={posts}
      />
    </Page>
  );
};

export default SpacesSinglePage;

export async function getServerSideProps({ params }) {
  const category = params?.category;
  const slug = params?.slug[0];

  const filters = {
    category: {
      slug: {
        $eq: category,
      },
    },
  };
  const { data: posts } = await getSpaces(1, 3, filters);
  const { data } = await getSpaceBySlug(slug);

  //! Need to fetch single post data including SEO information
  const page = {
    ...data.attributes,
    seo: {
      title: `${data?.attributes?.title} | Spaces ${data?.attributes?.category?.data?.attributes?.name} `,
      description: "",
      robots: {
        index: "index",
        follow: "follow",
      },
    },
  };

  //* Example of how to render 404 on static pages
  if (!page) {
    return {
      notFound: true,
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

  //* This will be passed to the page component as props
  return {
    props: { page, posts, footerCategories },
  };
}
