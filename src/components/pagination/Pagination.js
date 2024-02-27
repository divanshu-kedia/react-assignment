import React from "react";
import "./style.scss";
export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNeighbors = 1; // Number of pages to show around the current page
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };
  // Define the page blocks to be displayed
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbors * 2 + 3; // Total number of pages to show
    const totalBlocks = totalNumbers + 2; // Including arrows

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = ["LEFT_ELLIPSIS", ...extraPages, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, "RIGHT_ELLIPSIS"];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = ["LEFT_ELLIPSIS", ...pages, "RIGHT_ELLIPSIS"];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  pageNumbers.push(...fetchPageNumbers());

  const handleClick = (page) => {
    if (page === "LEFT_ELLIPSIS") {
      paginate(currentPage - pageNeighbors * 2 - 1);
    } else if (page === "RIGHT_ELLIPSIS") {
      paginate(currentPage + pageNeighbors * 2 + 1);
    } else {
      paginate(page);
    }
  };

  return (
    <nav>
      <div className="pagination">
        <div>
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </div>
        {pageNumbers.map((number, index) => (
          <div key={index}>
            {number === "LEFT_ELLIPSIS" || number === "RIGHT_ELLIPSIS" ? (
              <span onClick={() => handleClick(number)}>&hellip;</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            )}
          </div>
        ))}
        <div>
          <button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </nav>
  );
}
