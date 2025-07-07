'use client';

import SummaryCardItem from './SummaryCardItem';
import { summaryStructure } from '../utils/summaryStructure';

export default function SummaryCards({ data = {}, only = [] }) {
  const filteredStructure = only.length
    ? summaryStructure.filter(({ key }) => only.includes(key))
    : summaryStructure;

  return (
    <>
      {filteredStructure.map(({ key, title, icon, isCurrency }) => (
        <SummaryCardItem
          key={key}
          title={title}
          icon={icon}
          isCurrency={isCurrency}
          value={data[key]}
        />
      ))}
    </>
  );
}
