export const API_URL = process.env.SITE_CMS_API_URL;
export const PUBLIC_API_URL = process.env.NEXT_PUBLIC_SITE_CMS_API_URL;
export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
export const CMS_URL_LOGIN =
  process.env.NEXT_PUBLIC_CMS_URL + "/admin/auth/login";
export const CMS_URL_REGISTER =
  process.env.NEXT_PUBLIC_CMS_URL + "/admin/auth/register";

export const POSTS_API = "posts";
export const HOME_PAGE_API = "home-page";
export const ADVICE_SUPPORT_TRAINING = "advice-support-training";
export const POSTS_CATEGORIES_API = "categories-posts";
export const PAGES_API = "pages";
export const RESOURCES_API = "resources";
export const RESOURCES_CATEGORIES_API = "categories-resources";
export const SPACES_API = "spaces";
export const SPACES_CATEGORIES_API = "categories-spaces";
export const COMPANIES_API = "companies";
export const COMPANIES_CATEGORIES_API = "categories-companies";
export const COMPANY_ADMIN_API = "company-admin";
export const COMPANY_ADMIN_REGISTER_USER_API = "company-admin/register-user";

export const BLACKHORSE_LANE_COORDS = {
  lat: 51.5911693,
  lng: -0.0393474,
};

export const MAP_MARKER =
  "M56.525,24.533c0-13.548-10.982-24.528-24.529-24.528c-13.356,0-24.2,10.683-24.501,23.968  c-0.009-0.004-0.02-0.004-0.028-0.004c-0.006,0.12,0.013,0.241,0.01,0.362c-0.001,0.067-0.01,0.135-0.01,0.202  c0,0.244,0.03,0.479,0.037,0.72C7.78,41.191,25.795,58.009,31.996,63.995c17.415-14.119,22.485-27.216,23.95-34.199  c0.053-0.245,0.1-0.489,0.145-0.734c0.141-0.752,0.239-1.426,0.307-2.004c0-0.007,0.002-0.014,0.002-0.021  C56.583,25.423,56.525,24.533,56.525,24.533z";

export const GOOGLE_CAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY;
