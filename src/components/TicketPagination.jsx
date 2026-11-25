import { ChevronLeft, ChevronRight } from "lucide-react";

function TicketPagination({ count, page, pageCount, pageSize, onPageChange }) {
  // Calculate the displayed range.
  // If there are no tickets, both the first and last item should be zero.
  const firstItem = count === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, count);

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 text-[9px] text-stone-600">
      <span>Showing {firstItem}-{lastItem} of {count} tickets</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="grid h-7 w-7 place-items-center rounded border border-stone-200 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={12} />
        </button>
        <span aria-current="page" className="px-2">{page} / {pageCount}</span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          disabled={page === pageCount}
          className="grid h-7 w-7 place-items-center rounded border border-stone-200 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

export default TicketPagination;
