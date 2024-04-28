import strapi from "..";
import { POSTS_API } from "@/lib/utils/constants";

const getPosts = async (page = 1, perPage = 10, filters = {}) => {
  try {
    const { data } = await strapi.get(POSTS_API, {
      params: {
        sort: "createdAt:desc",
        "populate[jobs_meta]": "*",
        "populate[category][fields][0]": "name",
        "populate[category][fields][1]": "slug",
        "populate[company][fields][0]": "name",
        "populate[company][fields][1]": "address",
        "populate[company][populate][0]": "avatar",
        "populate[hero][populate]": "*",
        "populate[events_meta]": "*",
        filters: filters,
        pagination: {
          pageSize: perPage,
          page: page,
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to get Posts: ", error);
    return [];
  }
};

export default getPosts;
