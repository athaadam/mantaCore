export default function ActionButtons({ onExport }) {
    return (
        <button
            onClick={onExport}
            className="bg-[#7c70e8] text-white px-4 py-1 rounded hover:opacity-90"
        >
            Export as PDF
        </button>

    );
}
