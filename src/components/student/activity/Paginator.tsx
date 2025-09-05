import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* 

  need a usestate varible with these fields
  
  const [pagination, setPagination] = useState({
    page: 1, 
    limit: 10
  }); 
  
*/

type PaginationState = {
  page: number;
  limit: number;
};

type PaginatorProps = {
  totalItems: number;
  pagination: PaginationState;
  setPagination: Function,
};

export default function StudentPaginator(props: PaginatorProps) {
  const { totalItems, pagination, setPagination } = props;

  const totalPages = Math.ceil(totalItems / pagination.limit);

  return (
    <div className="z-100 sticky bottom-4 w-full left-0 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 px-3 py-2 
      bg-gradient-to-r from-pink-100 to-purple-100/90 backdrop-blur-sm shadow-lg border-2 border-pink-200 rounded-2xl">
      <StudentPageNavigation
        currentPage={pagination.page}
        totalPages={totalPages}
        onPrev={() =>
          setPagination({ ...pagination, page: Math.max(1, pagination.page - 1) })
        }
        onNext={() =>
          setPagination({
            ...pagination,
            page: Math.min(totalPages, pagination.page + 1),
          })
        }
      />

      <StudentItemsPerPageSelector
        value={pagination.limit}
        onChange={(limit) => setPagination({ page: 1, limit: limit})}
      />
    </div>
  );
}

type StudentPageNavigationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

function StudentPageNavigation(props: StudentPageNavigationProps) {
  const { currentPage, totalPages, onPrev, onNext } = props;

  return (
    <div className="flex items-center gap-4 p-1">
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        className="flex items-center justify-center w-12 h-10 rounded-2xl border-2 border-purple-300 
          bg-white hover:bg-pink-50 hover:border-pink-400 disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 shadow-md hover:shadow-lg text-purple-600 hover:text-pink-600"
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
      </button>

      <div className="flex items-center gap-2 px-6 py-1.5 bg-white/80 rounded-2xl border-2 border-purple-200">
        <span className="text-base text-purple-800 font-bold">
          📄 Page <span className="text-pink-600">{currentPage}</span> of <span className="text-pink-600">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center w-12 h-10 rounded-2xl border-2 border-purple-300 
          bg-white hover:bg-pink-50 hover:border-pink-400 disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 shadow-md hover:shadow-lg text-purple-600 hover:text-pink-600"
        aria-label="Next page"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
      </button>
    </div>
  );
}

type StudentItemsPerPageSelectorProps = {
  value: number;
  onChange: (val: number) => void;
};

function StudentItemsPerPageSelector(props: StudentItemsPerPageSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-base text-purple-800 font-bold">Items per page:</span>
      <div className="relative">
        <select
          className="appearance-none px-4 py-1 pr-10 border-2 border-purple-300 rounded-xl bg-white 
            text-purple-800 text-base font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 
            focus:border-transparent hover:border-pink-400 transition-all duration-200 shadow-md"
          value={props.value}
          onChange={(e) => props.onChange(parseInt(e.target.value))}
        >
          {[5, 10, 20, 50].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FontAwesomeIcon icon={faChevronDown} className="text-purple-400 text-sm" />
        </div>
      </div>
    </div>
  );
} 