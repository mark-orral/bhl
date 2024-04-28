import strapi from "..";
import { SPACES_CATEGORIES_API } from "@/lib/utils/constants";

const getSpacesCategories = async () => {
  try {
    const {
      data: { data },
    } = await strapi.get(SPACES_CATEGORIES_API, {
      params: {
        sort: "name:asc",
        pagination: {
          pageSize: 25,
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Spaces Categories: ", error);

    return [];
  }
};

export default getSpacesCategories;
