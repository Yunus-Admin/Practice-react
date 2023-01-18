import { useMemo } from "react";

export const usePagination = (totalPages) => {
  let pagesArr = [];
  return useMemo(() => {
    for (let i = 0; i < totalPages.length; i++) {
      pagesArr.push(i + 1);
    }
    console.log("usePagination");
    return pagesArr;
  }, []);
};
