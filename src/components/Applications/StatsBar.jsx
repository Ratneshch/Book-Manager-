export default function StatsBar({ books = [] }) {
    const total = books.length;
    const reading = books.filter((b) => b.status === "Reading").length;
    const completed = books.filter((b) => b.status === "Completed").length;
    const wantToRead = books.filter((b) => b.status === "Want to Read").length;

    const stats = [
        { label: "Total Books", count: total, color: "bg-blue-50 text-blue-600" },
        { label: "Want to Read", count: wantToRead, color: "bg-yellow-50 text-yellow-600" },
        { label: "Reading", count: reading, color: "bg-purple-50 text-purple-600" },
        { label: "Completed", count: completed, color: "bg-green-50 text-green-600" },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div key={stat.label} className={`rounded-xl p-4 text-center ${stat.color}`}>
                    <p className="text-3xl font-bold">{stat.count}</p>
                    <p className="text-sm mt-1 font-medium">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}