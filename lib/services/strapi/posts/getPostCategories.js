import strapi from "..";
import { POSTS_CATEGORIES_API } from "@/lib/utils/constants";

const getPostCategories = async () => {
  try {
    const {
      data: { data },
    } = await strapi.get(POSTS_CATEGORIES_API, {
      params: {
        sort: "name:asc",
        pagination: {
          pageSize: 25,
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Post Categories: ", error);

    return [];
  }
};

export default getPostCategories;
