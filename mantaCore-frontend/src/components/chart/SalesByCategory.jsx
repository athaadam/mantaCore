"use client";

import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { formatRupiah } from "@/components/utils/formatRupiah";

const defaultColors = [
    "#9B59B6", "#85C1E9", "#BB8FCE", "#82E0AA", "#F7DC6F",
    "#F1948A", "#5DADE2", "#F8C471", "#58D68D", "#A569BD"
];

export default function SalesByCategory({ report }) {
    const canvasRef = useRef(null);

    const salesByCategory = report || {};
    const labels = Object.keys(salesByCategory);
    const data = Object.values(salesByCategory);
    const hasData = labels.length > 0;

    useEffect(() => {
        if (!canvasRef.current || !hasData) return;

        const chart = new Chart(canvasRef.current, {
            type: "doughnut",
            data: {
                labels,
                datasets: [
                    {
                        label: "Sales by Category",
                        data,
                        backgroundColor: defaultColors.slice(0, labels.length),
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => formatRupiah(context.raw),
                        },
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [hasData, salesByCategory]);

    const legendLabels = hasData
        ? labels.map((label, index) => ({
            label,
            color: defaultColors[index % defaultColors.length],
        }))
        : [];

    return (
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[340px] min-h-[280px] flex flex-col items-center">
            

            {!hasData ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center text-gray-500 gap-4 w-full">
                    <img
                        src="/assets/common/salesbycategory.svg"
                        alt="No sales data"
                        className="w-40 h-40 object-contain opacity-80"
                    />
                    <p className="text-sm">No sales data available for this period.</p>
                </div>
            ) : (
                <>
                    <div className="relative w-full max-w-[300px] aspect-square">
                        <canvas ref={canvasRef} className="!w-full !h-full"></canvas>
                    </div>

                    <div className="mt-auto self-start flex flex-col gap-2 text-sm text-gray-700">
                        {legendLabels.map(({ label, color }) => (
                            <div key={label} className="flex items-center gap-2">
                                <span
                                    className="inline-block w-4 h-4 rounded-full"
                                    style={{ backgroundColor: color }}
                                ></span>
                                {label}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
