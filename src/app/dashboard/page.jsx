// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { userLogout, getMe } from "@/redux/features/authSlice";
import StatsBar from "@/components/Applications/StatsBar";
import { deleteBook, getBooks } from "@/redux/features/bookSlice";
import FilterBar from "@/components/Applications/FilterBar";
import BookCard from "@/components/Applications/BookCard";
import Image from "next/image";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);
  const { books, loading } = useSelector((state) => state.books);

  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    dispatch(getBooks());
    console.log("books:", books);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const filteredBooks = Array.isArray(books)
    ? activeFilter === "all"
      ? books
      : books.filter((b) => b.status === activeFilter)
    : [];

  const handleLogout = async () => {
    await dispatch(userLogout());
    router.push("/auth/login");
  };

  const handleDelete = async (id) => {
    await dispatch(deleteBook(id));
  };

  return (
    <div className="min-h-screen">
      {/* navbar */}
      {/* Navbar */}
      <div className="w-full mx-auto mt-3 sm:mt-5 rounded-2xl sm:rounded-4xl flex items-center justify-between bg-gray-100 py-3 px-4 sm:px-0">
        <div className="px-3 sm:px-10 flex flex-row items-center">
          <h1 className="font-semibold font-inter text-lg sm:text-2xl">
            Book Manager
          </h1>
        </div>
        <div className="flex flex-row items-center gap-2 sm:gap-5 px-3 sm:px-10">
          <h1 className="text-black font-semibold text-sm sm:text-base hidden sm:block">
            Hello, {user?.name}
          </h1>
          <Button
            onClick={handleLogout}
            className="cursor-pointer text-black text-sm sm:text-md border-amber-500 rounded-full px-4 sm:px-7 py-1"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Heading */}
      <div className="w-full flex items-center justify-center mt-5 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          Your Books Collection!
        </h1>
      </div>

      {/* Stats + content wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <StatsBar books={books} />

        {/* Filter + Add */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 sm:mt-8 mb-4">
          <FilterBar
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <Button
            onClick={() => router.push("/books/add")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer w-full sm:w-auto"
          >
            + Add Book
          </Button>
        </div>

        {/* Books Grid */}
        {loading ? (
          <p className="text-center text-gray-500 text-medium mt-15">
            Loading Your Books Collection....
          </p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500 text-medium mt-15">
            No Books found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
