import strapi from "..";
import { SPACES_API } from "@/lib/utils/constants";

const getSpaces = async (page = 1, perPage = 10, filters = {}) => {
  try {
    const { data } = await strapi.get(SPACES_API, {
      params: {
        sort: "createdAt:desc",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
        "populate[hero][populate]": "*",
        filters,
        pagination: {
          pageSize: perPage,
          page,
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to get Spaces: ", error);
    return [];
  }
};

export default getSpaces;
