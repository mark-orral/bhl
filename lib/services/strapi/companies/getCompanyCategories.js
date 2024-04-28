import strapi from "..";
import { COMPANIES_CATEGORIES_API } from "@/lib/utils/constants";

const getCompanyCategories = async () => {
  try {
    const {
      data: { data },
    } = await strapi.get(COMPANIES_CATEGORIES_API, {
      params: {
        sort: "name:asc",
        pagination: {
          pageSize: 25,
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Company Categories: ", error);
    return [];
  }
};

export default getCompanyCategories;
