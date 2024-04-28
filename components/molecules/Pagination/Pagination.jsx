import { useSearchParams } from "next/navigation";
import Link from "next/link";

import usePagination from "@/lib/hooks/usePagination";

import styles from "./pagination.module.scss";

export const dotts = "....";

const Pagination = ({ currentPage, totalPages, path }) => {
  const searchParams = useSearchParams();

  const from = searchParams.get("from") ?? null;
  const to = searchParams.get("to") ?? null;

  const type = searchParams.get("industry") ?? null;
  const search = searchParams.get("search") ?? null;

  const urlSearchParams = searchParams
    ? new URLSearchParams(searchParams)
    : null;

  urlSearchParams.delete("page");
  urlSearchParams.delete("category");

  const query = urlSearchParams ? urlSearchParams.toString() : null;

  const pages = usePagination(currentPage, totalPages);

  const prevLink = (currentPage) => {
    return totalPages > 1 && currentPage !== 1 ? (
      <li>
        <Link
          href={{ pathname: path(currentPage - 1), query: query }}
          className={styles.prev}
          aria-label={`previous page`}
        >
          &#9668;
        </Link>
      </li>
    ) : (
      <li></li>
    );
  };

  const nextLink = (currentPage) => {
    return totalPages > 1 && currentPage !== totalPages ? (
      <li>
        <Link
          href={{ pathname: path(currentPage + 1), query: query }}
          className={styles.next}
          aria-label={`next page`}
        >
          &#9654;
        </Link>
      </li>
    ) : (
      <li></li>
    );
  };

  return pages ? (
    <div className={styles.component}>
      <ul aria-label="pagination">
        {prevLink(currentPage)}
        {pages?.map((pageNumber, i) => {
          return pageNumber === dotts ||
            totalPages <= 1 ||
            pageNumber === currentPage ? (
            <li key={i}>
              {pageNumber === dotts ? (
                pageNumber
              ) : (
                <span
                  className={pageNumber === currentPage ? styles.active : ""}
                  aria-label={`page ${pageNumber}`}
                  aria-current="page"
                >
                  {pageNumber}
                </span>
              )}
            </li>
          ) : (
            <li key={i}>
              <Link
                href={{ pathname: path(pageNumber), query: query }}
                aria-label={`page ${pageNumber}`}
              >
                {pageNumber}
              </Link>
            </li>
          );
        })}
        {nextLink(currentPage)}
      </ul>
    </div>
  ) : null;
};

export default Pagination;
