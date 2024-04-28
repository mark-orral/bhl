import Page from "@/components/common/Page";
import { Single } from "@/components/templates/Directory";

import getCompanyBySlug from "@/lib/services/strapi/companies/getCompanyBySlug";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";

const DirectorySinglePage = ({ page }) => {
  return (
    <Page seo={{ title: page.seo.title, description: page.seo.description }}>
      <Single page={page} />
    </Page>
  );
};

export default DirectorySinglePage;

export async function getServerSideProps({ params }) {
  const slug = params?.slug;
  const { data } = await getCompanyBySlug(slug);
  //! Need to fetch single post data including SEO information
  const page = {
    ...data.attributes,
    seo: {
      title: `${data?.attributes.name} | Directory`,
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
