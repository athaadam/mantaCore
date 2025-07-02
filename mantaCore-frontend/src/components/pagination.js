'use client';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-end items-center gap-4 mt-6 text-sm">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'}
        `}
      >
       Prev
      </button>

      <span className="text-gray-700 font-medium">
        Page <span className="font-bold">{currentPage}/{totalPages}</span> 
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'}
        `}
      >
        Next
      </button>
    </div>
  );
}
