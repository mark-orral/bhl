import strapi from "..";
import { COMPANIES_API } from "@/lib/utils/constants";

const getCompanies = async (page = 1, pageSize = 10, filters = {}) => {
  try {
    const { data } = await strapi.get(COMPANIES_API, {
      params: {
        sort: "name:asc",
        "populate[avatar]": "*",
        "populate[categories][fields][0]": "name",
        "populate[categories][fields][1]": "slug",
        filters: filters,
        pagination: {
          pageSize: pageSize,
          page: page,
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Companies: ", error);
    return [];
  }
};

export default getCompanies;
