import { useState } from "react";

export const usePageNumber = (initialPage: number) => {
  const [pageNumber, setPageNumber] = useState(initialPage);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return { pageNumber, nextPage, previousPage };
};
