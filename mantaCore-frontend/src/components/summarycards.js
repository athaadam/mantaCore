// SummaryCards.jsx
import SummaryCard from './summarycard';
import summaryStructure from '@/constants/summarystructure';

export default async function SummaryCards({ data = {}, only = [] }) {
  const filteredStructure = only.length
    ? summaryStructure.filter(({ key }) => only.includes(key))
    : summaryStructure;

  return (
    <>
      {filteredStructure.map(({ key, title, icon, isCurrency }) => {
        const rawValue = data[key];
        const displayValue =
          rawValue !== undefined
            ? isCurrency
              ? `Rp${Number(rawValue).toLocaleString()}`
              : Number(rawValue).toLocaleString()
            : isCurrency
              ? 'Rp0'
              : '0';

        return (
          <SummaryCard
            key={key}
            icon={icon}
            title={title}
            value={displayValue}
          />
        );
      })}
    </>
  );
}

