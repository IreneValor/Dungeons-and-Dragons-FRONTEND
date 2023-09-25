const Pagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-center">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => handleClick(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;



