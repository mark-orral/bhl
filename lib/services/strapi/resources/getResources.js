import strapi from "..";
import { RESOURCES_API } from "@/lib/utils/constants";

const getResources = async (page = 1, perPage = 10, filters = {}) => {
  try {
    const { data } = await strapi.get(RESOURCES_API, {
      params: {
        sort: "createdAt:desc",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
        "populate[hero][populate]": "*",
        // populate company
        "populate[company]": "*",
        filters: filters,
        pagination: {
          pageSize: perPage,
          page: page,
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to get Resources: ", error);
    return [];
  }
};

export default getResources;
