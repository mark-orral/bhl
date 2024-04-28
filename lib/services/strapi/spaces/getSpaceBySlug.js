import strapi from "..";
import { SPACES_API } from "@/lib/utils/constants";

const getSpaceBySlug = async (slug) => {
  try {
    const { data } = await strapi.get(`${SPACES_API}/${slug}`, {
      params: {
        // "populate[company][populate][0]": "avatar",
        "populate[category]": "*",
        "populate[hero][populate]": "*",
        "populate[components][populate]": "*",
        "populate[location][populate]": "*",
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Space: ", error);
    return null;
  }
};

export default getSpaceBySlug;
