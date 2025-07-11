"use client";

import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { formatRupiah } from "@/libs/utils/formats/formatRupiah";

const defaultColors = [
    "#9B59B6", "#85C1E9", "#BB8FCE", "#82E0AA", "#F7DC6F",
    "#F1948A", "#5DADE2", "#F8C471", "#58D68D", "#A569BD"
];

export default function SalesByCategory({ report }) {
    const canvasRef = useRef(null);
    // Handle the percentage format: [{category, percentage}, ...]
    let labels = [];
    let data = [];
    let hasData = false;
    
    if (Array.isArray(report)) {
        // Array format: [{category, percentage}, ...] 
        labels = report.map(item => item.category);
        data = report.map(item => item.percentage);
        hasData = report.length > 0;
    } else {
        // Original object format: {category1: value1, ...}
        const salesByCategory = report || {};
        labels = Object.keys(salesByCategory);
        data = Object.values(salesByCategory);
        hasData = labels.length > 0;
    }
    
    console.log(report, " sales by category")
    useEffect(() => {
        if (!canvasRef.current || !hasData) return;

        const chart = new Chart(canvasRef.current, {
            type: "doughnut",
            data: {
                labels,
                datasets: [
                    {
                        label: Array.isArray(report) ? "Category Percentage" : "Sales by Category",
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
                    },                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    // If using percentage data format
                                    if (Array.isArray(report)) {
                                        return `${context.raw}%`;
                                    }
                                    // Original format
                                    return formatRupiah(context.raw);
                                },
                            },
                        },
                },
            },
        });

        return () => chart.destroy();
    }, [hasData, report, labels, data]);

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
                                <span className="font-medium">{label}</span>
                                {Array.isArray(report) && (
                                    <span className="text-gray-500 ml-1">({data[labels.indexOf(label)]}%)</span>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
