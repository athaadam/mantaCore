'use client';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>
      <span className="px-4 py-1">{currentPage} / {totalPages}</span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
