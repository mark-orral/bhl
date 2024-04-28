import { CMS_URL } from "@/lib/utils/constants";

const cmsFetch = (resource) => {
  return resource ? CMS_URL + resource : null;
};

export default cmsFetch;
