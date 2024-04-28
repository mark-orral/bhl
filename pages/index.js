import Page from "@/components/common/Page";
import Home from "@/components/templates/home";

import getPosts from "@/lib/services/strapi/posts/getPosts";
import getCompanies from "@/lib/services/strapi/companies/getCompanies";
import getCompanyCategories from "@/lib/services/strapi/companies/getCompanyCategories";

import pages from "@/lib/data/pages/pages.json";
import { getHomePage } from "@/lib/services/strapi/home-page/getHomePage";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";
// import menus from "../data/global/navigation.json";

//* Example component data which would normally be fetched from an API call
// import { exampleComponentData } from "../services/wordpress/pages/exampleComponentData";

const FrontPage = ({
  page,
  content,
  posts,
  businessCount,
  businessCategories,
}) => {
  return (
    <Page seo={page.seo}>
      <Home
        content={content}
        posts={posts}
        businessCategories={businessCategories}
        businessCount={businessCount}
      />
    </Page>
  );
};

export default FrontPage;

export async function getServerSideProps(context) {
  //* Example of how to fetch data for use
  // const pages = await getAllPages();
  // console.log(pages);

  const page = pages.find((page) => page.slug === "/");
  const { data } = await getHomePage();
  const { data: posts } = await getPosts();

  const {
    meta: {
      pagination: { total: businessCount },
    },
  } = await getCompanies();

  const businessCategoryData = getCompanyCategories();
  const eventsCategoryData = getPostCategories();
  const spacesCategoryData = getSpacesCategories();
  const resourcesCategoryData = getResourcesCategories();

  const [
    businessCategories,
    eventsCategories,
    spacesCategories,
    resourcesCategories,
  ] = await Promise.all([
    businessCategoryData,
    eventsCategoryData,
    spacesCategoryData,
    resourcesCategoryData,
  ]);

  const footerCategories = {
    community: eventsCategories || null,
    spaces: spacesCategories || null,
    resources: resourcesCategories || null,
  };

  //* Example of how to render 404 on static pages
  if (!page) {
    return {
      notFound: true,
    };
  }

  //* This will be passed to the page component as props
  return {
    props: {
      page,
      content: data?.attributes || null,
      posts,
      businessCount,
      businessCategories,
      footerCategories,
    },
  };
}
