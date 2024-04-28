import Page from "@/components/common/Page";
import { Single } from "@/components/templates/Page";

import getPageBySlug from "@/lib/services/strapi/pages/getPageBySlug";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

const StandardPage = ({ page }) => {
  return (
    <Page seo={page.seo}>
      <Single page={page} />
    </Page>
  );
};

export default StandardPage;

export async function getServerSideProps({ params }) {
  const slug = params?.slug;

  const {
    data: { attributes: post },
  } = await getPageBySlug(slug);

  //! Need to fetch single post data including SEO information
  const page = {
    ...post,
    seo: {
      title: `${post.title}`,
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
    props: { page, footerCategories },
  };
}
