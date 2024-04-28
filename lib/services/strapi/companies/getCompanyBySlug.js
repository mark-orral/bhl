import strapi from "..";
import { COMPANIES_API } from "@/lib/utils/constants";

const getCompanyBySlug = async (slug) => {
  try {
    const { data } = await strapi.get(`${COMPANIES_API}/${slug}`, {
      params: {
        "populate[avatar]": "*",
        "populate[hero][populate]": "*",
        "populate[components]": "*",
        "populate[components][populate][0]": "social_links",
        "populate[components][populate][1]": "portfolio_items.image",
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Post: ", error);
    return null;
  }
};

export default getCompanyBySlug;
