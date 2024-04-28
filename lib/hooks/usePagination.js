import { dotts } from "@/components/molecules/Pagination";

const getPages = (length, inc = 1) => Array.from({ length }, (_, i) => i + inc);

const usePagination = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return getPages(totalPages);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, dotts, totalPages];
  }

  if (currentPage < totalPages - 2) {
    return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
  }

  return [1, dotts, ...getPages(3, totalPages - 2)];
};

export default usePagination;
