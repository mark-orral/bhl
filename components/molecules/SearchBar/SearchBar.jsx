import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import Button from "@/components/atoms/Button";

import styles from "./search-bar.module.scss";

const icon = () => {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="21.995"
      height="21.995"
      viewBox="0 0 21.995 21.995"
    >
      <g transform="translate(-989.282 -417.532)">
        <g
          transform="translate(989.282 427.982) rotate(-45)"
          fill="none"
          stroke="#1a1a1a"
          stroke-width="2"
        >
          <circle cx="7.39" cy="7.39" r="7.39" stroke="none" />
          <circle cx="7.39" cy="7.39" r="6.39" fill="none" />
        </g>
        <line
          y1="8.758"
          transform="translate(1004.377 432.627) rotate(-45)"
          fill="none"
          stroke="#1a1a1a"
          stroke-width="2"
        />
      </g>
    </svg>
  );
};

const SearchBar = () => {
  const [keywords, setKeywords] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const getActiveSearch = (query) => {
    if (keywords) {
      return keywords;
    }
    return null;
  };

  const handleSearchQuery = (input) => {
    const query = {
      ...router.query,
      search: input,
    };

    if (input === "") {
      delete query.search;
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
  };

  useEffect(() => {
    setKeywords(search);
  }, [search]);

  return (
    <form
      id="search-form"
      className={styles.component}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchQuery(e.target[0].value);
      }}
    >
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => setKeywords(e.target.value)}
        value={getActiveSearch(search)}
      />
      <Button
        className={styles.component_button}
        type="submit"
        form="search-form"
      >
        Search
        {icon()}
      </Button>
    </form>
  );
};

export default SearchBar;
