import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousClick,
  onNextClick
}) => {
  return (
    <div 
      className="container-fluid px-4 px-lg-5 mt-5 text-center my-5 pagination-section" 
      style={{ opacity: 1 }}
    >
      <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
        <button 
          id="prev-btn" 
          className="btn btn-outline-primary"
          disabled={currentPage <= 1}
          onClick={onPreviousClick}
        >
          &lt; Anterior
        </button>

        <p className="pagination-info m-0 text-white">
          Página{' '}
          <span id="current-page" className="text-warning fw-bold">
            {currentPage}
          </span>
          {' '}de{' '}
          <span id="total-pages" className="text-warning fw-bold">
            {totalPages || 1}
          </span>
        </p>

        <button 
          id="next-btn" 
          className="btn btn-outline-primary"
          disabled={currentPage >= totalPages}
          onClick={onNextClick}
        >
          Próximo &gt;
        </button>
      </div>
    </div>
  );
};