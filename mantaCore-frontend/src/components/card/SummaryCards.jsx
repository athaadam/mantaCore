'use client';

import SummaryCardItem from './SummaryCardItem';
import { summaryStructure } from '../utils/summaryStructure';

export default function SummaryCards({ data = {}, only = [] }) {
  const filteredStructure = only.length
    ? summaryStructure.filter(({ key }) => only.includes(key))
    : summaryStructure;

  if (filteredStructure.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">No summary data available</p>
        <p className="text-slate-400 text-sm mt-2">Data will appear here when available</p>
      </div>
    );
  }

  // Premium dynamic grid based on number of cards
  const getGridClass = (count) => {
    switch (count) {
      case 1:
        return "grid grid-cols-1 gap-6 lg:gap-8 w-full";
      case 2:
        return "grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full";
      case 4:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full";
    }
  };

  return (
    <div className={getGridClass(filteredStructure.length)}>
      {filteredStructure.map(({ key, title, icon, isCurrency }, index) => (
        <SummaryCardItem
          key={key}
          title={title}
          icon={icon}
          isCurrency={isCurrency}
          value={data[key]}
          index={index}
        />
      ))}
    </div>
  );
}
