import React from "react";

type PaginationState = {
  page: number;
  limit: number;
};

type PaginatorProps = {
  totalItems: number;
  pagination: PaginationState;
  onChange: (pagination: PaginationState) => void;
};

export default function Paginator(props: PaginatorProps) {
  const { totalItems, pagination, onChange } = props;

  const totalPages = Math.ceil(totalItems / pagination.limit);

  return (
    <div className="sticky bottom-0 w-full left-0 mt-5 flex justify-center gap-4 p-4 bg-red-200 shadow rounded-lg">
      <PageNavigation
        currentPage={pagination.page}
        totalPages={totalPages}
        onPrev={() =>
          onChange({ ...pagination, page: Math.max(1, pagination.page - 1) })
        }
        onNext={() =>
          onChange({
            ...pagination,
            page: Math.min(totalPages, pagination.page + 1),
          })
        }
      />

      <ItemsPerPageSelector
        value={pagination.limit}
        onChange={(limit) => onChange({ page: 1, limit })}
      />
    </div>
  );
}

// -------------------- Subcomponents --------------------

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
