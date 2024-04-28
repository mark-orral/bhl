import strapi from "..";
import { RESOURCES_CATEGORIES_API } from "@/lib/utils/constants";

const getResourcesCategories = async () => {
  try {
    const {
      data: { data },
    } = await strapi.get(RESOURCES_CATEGORIES_API, {
      params: {
        sort: "name:asc",
        pagination: {
          pageSize: 25,
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to get Resource Categories: ", error);

    return [];
  }
};

export default getResourcesCategories;
