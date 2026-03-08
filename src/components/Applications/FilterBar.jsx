// components/FilterBar.jsx
const filters = [
    { label: "All", value: "all" },
    { label: "Want to Read", value: "Want to Read" },
    { label: "Reading", value: "Reading" },
    { label: "Completed", value: "Completed" },
];

export default function FilterBar({ activeFilter, setActiveFilter }) {
    return (
        <div className="flex gap-2 flex-wrap overflow-x-auto">
            {filters.map((f) => (
                <button
                    key={f.value}
                    onClick={() => setActiveFilter(f.value)}
                    className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-all
                        ${activeFilter === f.value
                            ? "bg-yellow-500 text-white "
                            : "bg-white border text-gray-600 hover:bg-gray-50"
                        }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}