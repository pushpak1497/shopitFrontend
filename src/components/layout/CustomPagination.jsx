import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

function CustomPagination({ resPerPage, productsCount }) {
  const [currentPage, setCurrentPage] = useState();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center my-5 ">
      {productsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
}

export default CustomPagination;
