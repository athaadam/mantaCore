"use client";

import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { formatRupiah } from "@/components/utils/formatRupiah";

export default function TopSales({ report }) {
    const canvasRef = useRef(null);
    const topSales = report || [];
    const hasData = topSales.length > 0;

    useEffect(() => {
        if (!canvasRef.current || !hasData) return;

        const labels = topSales.map(item => item.name);
        const data = topSales.map(item => parseFloat(item.totalSales));

        const chart = new Chart(canvasRef.current, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Total Sales",
                        data,
                        backgroundColor: "#9370DB",
                        borderRadius: 5,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // agar chart bisa menyesuaikan tinggi/width container
                plugins: {
                    legend: { display: true },
                    tooltip: {
                        callbacks: {
                            label: (context) => formatRupiah(context.raw),
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => formatRupiah(value),
                        },
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [hasData, topSales]);

    return (
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[340px] min-h-[280px] flex flex-col items-center">
            <h3 className="text-xl text-gray-800 font-semibold mb-4 self-start">
                Top Sales Item
            </h3>

            {!hasData ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center text-gray-500 gap-4 w-full">
                    <img
                        src="/assets/common/topsales.svg"
                        alt="No sales data"
                        className="w-40 h-40 object-contain opacity-80"
                    />
                    <p className="text-sm">No sales data available for this period.</p>
                </div>
            ) : (
                <div className="relative w-full h-[300px]"> {/* Tinggi fixed + responsive */}
                    <canvas ref={canvasRef} className="!w-full !h-full" />
                </div>
            )}
        </div>
    );
}
