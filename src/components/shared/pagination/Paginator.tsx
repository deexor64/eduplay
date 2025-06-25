import React from "react";

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
    <div className="sticky bottom-2.5 w-full left-0 mt-5 flex justify-center gap-4 p-4 
      bg-red-200 shadow rounded-lg">
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
    <div className="flex items-center gap-2">
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page <b>{currentPage}</b> of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
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
    <div className="flex items-center gap-2">
      <span>Items per page:</span>
      <select
        className="px-2 py-1 border rounded"
        value={props.value}
        onChange={(e) => props.onChange(parseInt(e.target.value))}
      >
        {[5, 10, 20, 50].map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
    </div>
  );
}
