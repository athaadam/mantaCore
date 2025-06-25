import SummaryCard from './summarycard';
import summaryStructure from '@/constants/summarystructure';

export default async function SummaryCards({ data = {} }) {
  return (
    <>
      {summaryStructure.map(({ key, title, icon }) => (
        <SummaryCard
          key={key}
          icon={icon}
          title={title}
          value={
            data[key] !== undefined
              ? `Rp${Number(data[key]).toLocaleString()}`
              : 'Rp0'
          }
        />
      ))}
    </>
  );
}
