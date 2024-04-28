import strapi from "..";
import { HOME_PAGE_API } from "@/lib/utils/constants";

export const getHomePage = async () => {
  try {
    const { data } = await strapi.get(HOME_PAGE_API, {
      params: {
        "populate[Quicklinks][populate][Image]": "*",
        "populate[Featured_post][populate][category][populate]": "*",
        "populate[Featured_post][populate][hero][populate]": "*",
        "populate[Quote_home]": "*",
        // populate[company][populate][0]
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to get Home Page: ", error);
    return [];
  }
};
