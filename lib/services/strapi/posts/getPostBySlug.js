import strapi from "..";
import { POSTS_API } from "@/lib/utils/constants";

const getPostBySlug = async (slug) => {
  try {
    const { data } = await strapi.get(`${POSTS_API}/${slug}`, {
      params: {
        "populate[company][populate][0]": "avatar",
        "populate[category]": "*",
        "populate[hero][populate]": "*",
        "populate[components][populate]": "*",
        "populate[events_meta]": "*",
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Post: ", error);
    return null;
  }
};

export default getPostBySlug;
