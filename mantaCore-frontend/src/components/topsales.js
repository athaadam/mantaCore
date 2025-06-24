"use client";

import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function TopSales() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const chart = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: ['Tumbler A', 'Tumbler B', 'Tumbler C', 'Tumbler D', 'Tumbler E'],
                datasets: [{
                    label: 'Sales',
                    data: [20000, 15000, 12000, 6000, 5000],
                    backgroundColor: '#9370DB',
                    borderRadius: 5,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Rp${Number(context.raw).toLocaleString()}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => 'Rp' + value.toLocaleString()
                        }
                    }
                }
            }
        });

        return () => chart.destroy();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[340px] min-h-[280px] flex flex-col">
            <h3 className="text-xl text-gray-800 font-semibold mb-4">Top Sales Item</h3>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
