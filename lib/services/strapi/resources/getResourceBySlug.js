import strapi from "..";
import { RESOURCES_API } from "@/lib/utils/constants";

const getResourceBySlug = async (slug) => {
  try {
    const { data } = await strapi.get(`${RESOURCES_API}/${slug}`, {
      params: {
        "populate[category]": "*",
        "populate[hero][populate]": "*",
        "populate[components][populate]": "*",
        "populate[company][populate]": "*",
        // "populate[company][populate][avatar]": "*",
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Resource: ", error);
    return null;
  }
};

export default getResourceBySlug;
