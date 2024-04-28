import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import styles from "./category-filter.module.scss";

const CategoryFilter = ({ path, categories }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") ?? null;
  const to = searchParams.get("to") ?? null;

  const query = from && to ? { from: from, to: to } : {};

  const [, page, category] = pathname.split("/");

  const url =
    (typeof category !== "number" && !isNaN(category)) || category === undefined
      ? `/${page}/all`
      : `/${page}/${category}`;

  return categories ? (
    <div className={styles.component}>
      <ul>
        <li className={styles[page]}>
          <Link
            href={{ pathname: `/${path}/all`, query: query }}
            className={url === `/${path}/all` ? styles.active : ""}
          >
            Show all
          </Link>
        </li>
        {categories
          .filter(({ attributes: category }) => category.count > 0)
          .map(({ attributes: category }) => {
            return (
              <li key={`/${path}/${category.slug}`}>
                <Link
                  href={{
                    pathname: `/${path}/${category.slug}`,
                    query: query,
                  }}
                  className={
                    url === `/${path}/${category.slug}` ? styles.active : ""
                  }
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  ) : null;
};

export default CategoryFilter;
