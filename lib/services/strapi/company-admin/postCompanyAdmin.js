import strapi from "..";
import {
  COMPANY_ADMIN_API,
  COMPANY_ADMIN_REGISTER_USER_API,
  PUBLIC_API_URL,
} from "@/lib/utils/constants";

const postCompanyAdmin = async ({ firstname, lastname, password, email }) => {
  try {
    const { data } = await strapi.post(PUBLIC_API_URL + COMPANY_ADMIN_API, {
      params: {
        firstname,
        lastname,
        password,
        email,
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to post company admin: ", error);
    return [];
  }
};
export const postRegisterUser = async (
  { firstname, lastname, email },
  token
) => {
  try {
    const { data } = await strapi.post(
      PUBLIC_API_URL + COMPANY_ADMIN_REGISTER_USER_API,
      {
        params: {
          firstname,
          lastname,
          email,
        },
        ["g-recaptcha-response"]: token,
      }
    );

    return data;
  } catch (error) {
    console.error("Failed to post company admin: ", error);
    return [];
  }
};

export default postCompanyAdmin;
