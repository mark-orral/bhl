import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import Dropdown from "@/components/atoms/Dropdown";

const DropdownCategoryFilter = ({ categories, onChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("industry");

  const options = categories
    .filter(({ attributes: category }) => category.count > 0)
    .map(({ attributes: category }) => ({
      name: category.name,
      value: category.slug,
    }));

  options.unshift({
    name: "All",
    value: "all",
  });

  const getActivePlaceholder = (category) => {
    if (category) {
      const [option] = options.filter((option) => option.value === category);
      return option;
    }

    return null;
  };

  useEffect(() => {
    if (category) {
      onChange(getActivePlaceholder(category));
    }
  }, [category]);

  const handleCategorySelection = (option) => {
    const query = {
      ...router.query,
      industry: option.value,
    };

    if (option.value === "all") {
      delete query.industry;
    }

    router.push(
      {
        query: query,
      },
      undefined,
      {
        scroll: false,
      }
    );

    onChange(getActivePlaceholder(option.value));
  };

  return categories ? (
    <Dropdown
      placeholder={getActivePlaceholder(category)?.name || "Select Category"}
      options={options}
      onChange={(option) => handleCategorySelection(option)}
    />
  ) : null;
};

export default DropdownCategoryFilter;
