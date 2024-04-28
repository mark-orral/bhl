import Page from "@/components/common/Page";

import pages from "@/lib/data/pages/pages.json";
import getCompanies from "@/lib/services/strapi/companies/getCompanies";
import getCompanyCategories from "@/lib/services/strapi/companies/getCompanyCategories";

import Directory from "@/components/templates/Directory";
import getPostCategories from "@/lib/services/strapi/posts/getPostCategories";
import getSpacesCategories from "@/lib/services/strapi/spaces/getSpacesCategories";
import getResourcesCategories from "@/lib/services/strapi/resources/getResourcesCategories";

const DirectoryPage = ({
  page,
  companies,
  locations,
  categories,
  pagination,
}) => {
  return (
    <Page seo={page.seo}>
      <Directory
        companies={companies}
        locations={locations}
        categories={categories}
        pagination={{
          ...pagination,
          path: (page) => `/directory/page/${page}`,
        }}
      />
    </Page>
  );
};

export default DirectoryPage;

export async function getServerSideProps({ params, query }) {
  const category = query?.industry;
  const search = query?.search;
  const character = query?.starts_with;
  const currentPage = params?.page ? Number(params?.page) || 1 : null;

  const urlSearchParams = new URLSearchParams(query);
  urlSearchParams.delete("page");

  const urlQuery = urlSearchParams.toString();

  const filters = {
    categories: {
      slug: {
        $eq: category,
      },
    },
    $and: [
      {
        name: {
          $contains: search,
        },
      },
      {
        name: {
          $startsWith: character,
        },
      },
    ],
  };

  //! Replace dummy page data with real page data from Strapi
  const page = pages.find((page) => page.slug === "directory");

  const {
    data: companies,
    meta: { pagination },
  } = await getCompanies(currentPage, 10, filters);

  const { data: locations } = await getCompanies(currentPage, 100);

  const categories = await getCompanyCategories();

  const redirectDestination =
    category || search || character ? `/directory?${urlQuery}` : "/directory";

  if (currentPage === 1 || currentPage > pagination.pageCount) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: true,
      },
    };
  }

  if (!page || currentPage > pagination.pageCount) {
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

  return {
    props: {
      page,
      companies,
      locations,
      categories,
      footerCategories,
      pagination,
    },
  };
}
