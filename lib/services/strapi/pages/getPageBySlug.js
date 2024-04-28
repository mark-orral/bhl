import strapi from "..";
import { PAGES_API } from "@/lib/utils/constants";

const getPageBySlug = async (slug) => {
  try {
    const { data } = await strapi.get(`${PAGES_API}/${slug}`, {
      params: {
        "populate[hero][populate]": "*",
        "populate[components][populate]": "*",
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Page: ", error);
    return null;
  }
};

export default getPageBySlug;
