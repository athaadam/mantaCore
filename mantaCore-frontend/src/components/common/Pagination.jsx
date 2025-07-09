'use client';

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-white rounded-lg border border-slate-200">
      <div className="text-sm text-slate-600 order-2 sm:order-1">
        Showing page{' '}
        <span className="font-semibold text-slate-900">{currentPage}</span> of{' '}
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </div>
      
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm
            ${currentPage === 1
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'}
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-1">
          {/* Show page numbers for better navigation */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => pageNum !== currentPage && (pageNum > currentPage ? onNext() : onPrev())}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200
                  ${pageNum === currentPage
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'}
                `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm
            ${currentPage === totalPages
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'}
          `}
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
