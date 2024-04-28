import Page from "@/components/common/Page";
import { Single } from "@/components/templates/Resources";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";

import getResourceBySlug from "@/lib/services/strapi/resources/getResourceBySlug";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

const ResourcesSinglePage = ({ page }) => {
  return (
    <Page seo={page.seo}>
      <Single page={page} />
    </Page>
  );
};

export default ResourcesSinglePage;

export async function getServerSideProps({ params }) {
  const category = params?.category;
  const slug = params?.slug[0];

  const { data } = await getResourceBySlug(slug);

  //! Need to fetch single post data including SEO information
  const page = {
    ...data.attributes,
    seo: {
      title: `${data?.attributes?.title} | Skills & Training ${data?.attributes?.category?.data?.attributes?.name} `,
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
