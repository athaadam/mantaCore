"use client";

import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const chartData = {
    labels: ['Food', 'Drink', 'Furniture'],
    datasets: [
        {
            label: 'Sales by Category',
            data: [30, 35, 35],
            backgroundColor: ['#9B59B6', '#85C1E9', '#BB8FCE'],
            borderWidth: 1,
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 12,
                padding: 15,
            },
        },
        tooltip: {
            callbacks: {
                label: (context) => `${context.label}: ${context.raw}%`,
            },
        },
    },
};

export default function SalesByCategory() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const chart = new Chart(canvasRef.current, {
            type: 'doughnut',
            data: chartData,
            options: chartOptions,
        });

        return () => chart.destroy();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[340px] min-h-[280px] flex flex-col items-center">
            <h3 className="text-xl text-gray-800 font-semibold mb-4 self-start">Sales by Category</h3>

            {/* Chart canvas */}
            <div className="relative w-full max-w-[300px] aspect-square">
                <canvas ref={canvasRef} className="!w-full !h-full"></canvas>
            </div>

            {/* Manual legend di bawah */}
            <div className="mt-auto self-start flex flex-col gap-2 text-sm text-gray-700">
                {[
                    { label: 'Food', color: '#884EA0' },
                    { label: 'Drink', color: '#85C1E9' },
                    { label: 'Furniture', color: '#BB8FCE' },
                ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-2">
                        <span
                            className="inline-block w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                        ></span>
                        {label}
                    </div>
                ))}
            </div>

        </div>
    );
}
