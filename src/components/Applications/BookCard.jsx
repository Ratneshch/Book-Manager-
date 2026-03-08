// components/BookCard.jsx
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const statusStyles = {
    "Want to Read": "bg-red-100 text-red-700",
    "Reading": "bg-blue-100 text-blue-700",
    "Completed": "bg-green-100 text-green-700",
};

const statusLabels = {
    "Want to Read": "Want to Read",
    "Reading": "Reading",
    "Completed": "Completed",
};

export default function BookCard({ book, onDelete }) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl shadow-sm border p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">

            {/* Status Badge */}
            <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${statusStyles[book.status]}`}>
                {statusLabels[book.status]}
            </span>

            {/* Title & Author */}
            <div>
                <h3 className="font-bold text-lg leading-tight">{book.title}</h3>
                <p className="text-sm text-gray-500 mt-1">by {book.author}</p>
            </div>

            {/* Tags */}
            {book.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-2">
                <Button
                    onClick={() => router.push(`/books/edit/${book._id}`)}
                    variant="outline"
                    className="flex-1 text-sm cursor-pointer text-blue-500 border-blue-300 hover:bg-blue-50"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => onDelete(book._id)}
                    variant="outline"
                    className="flex-1 text-sm text-red-500 border-red-300 hover:bg-red-50 cursor-pointer"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}