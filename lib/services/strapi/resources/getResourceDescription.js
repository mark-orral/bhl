import strapi from "..";
import { ADVICE_SUPPORT_TRAINING } from "@/lib/utils/constants";

export const getResourceDescription = async () => {
  try {
    const { data } = await strapi.get(ADVICE_SUPPORT_TRAINING, {});

    return data;
  } catch (error) {
    console.error("Failed to get ADVICE_SUPPORT_TRAINING Page: ", error);
    return [];
  }
};
