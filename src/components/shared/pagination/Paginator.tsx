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

export default function Paginator(props: PaginatorProps) {
  const { totalItems, pagination, setPagination } = props;

  const totalPages = Math.ceil(totalItems / pagination.limit);

  return (
    <div className="sticky bottom-4 w-full left-0 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-2
      bg-gray-100/90 backdrop-blur-sm shadow-lg border border-gray-300/50 rounded-2xl">
      <PageNavigation
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

      <ItemsPerPageSelector
        value={pagination.limit}
        onChange={(limit) => setPagination({ page: 1, limit: limit})}
      />
    </div>
  );
}

type PageNavigationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

function PageNavigation(props: PageNavigationProps) {
  const { currentPage, totalPages, onPrev, onNext } = props;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 
          bg-white hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600 text-base" />
      </button>

      <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-xl border border-gray-200">
        <span className="text-sm text-gray-700">
          Page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 
          bg-white hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Next page"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-600 text-base" />
      </button>
    </div>
  );
}

type ItemsPerPageSelectorProps = {
  value: number;
  onChange: (val: number) => void;
};

function ItemsPerPageSelector(props: ItemsPerPageSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700 font-medium">Items per page:</span>
      <div className="relative">
        <select
          className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-xl bg-white 
            text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-transparent hover:border-gray-400 transition-all duration-200 shadow-sm"
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
          <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
        </div>
      </div>
    </div>
  );
}
