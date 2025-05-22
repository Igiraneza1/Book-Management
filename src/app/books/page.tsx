"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Book } from "../types/book";

function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/v1/books");
        console.log("API Response:", res.data);

        const validatedBooks = res.data.map((book: Book) => ({
          _id: book._id,
          title: book.title || "Untitled",
          author: book.author || "Unknown Author",
          isbn: book.isbn || "N/A",
          publishedYear: book.publishedYear || "Unknown Year",
        }));

        setBooks(validatedBooks);
      } catch (error) {
        console.error("Failed to fetch books", error);
        alert("Failed to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:4000/api/v1/books/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert(
        `Delete failed: ${
          axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : "Unknown error"
        }`
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && books.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 px-4 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="font-bold text-3xl">📚 Book Collection</h1>
        <Link
          href="/books/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-colors"
        >
          + Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
          <p className="mb-4 text-gray-500">
            Get started by adding your first book to the collection.
          </p>
          <Link
            href="/books/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            + Add New Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-2 border-gray-200 divide-y divide-gray-300 text-sm min-w-[600px]">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Author</th>
                <th className="text-left px-4 py-2">ISBN</th>
                <th className="text-left px-4 py-2">Year</th>
                <th className="text-center px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {books.map((book) => (
                <tr key={book._id} className="divide-y divide-gray-300">
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.isbn}</td>
                  <td className="px-4 py-2">{book.publishedYear}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                      <Link
                        href={`/books/${book._id}`}
                        className="hover:underline text-green-500 text-sm px-3 py-1 rounded transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        href={`/books/edit/${book._id}`}
                        className="hover:underline text-blue-500 text-sm px-3 py-1 rounded transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        disabled={deletingId === book._id}
                        className={`hover:underline text-red-500 text-sm px-3 py-1 rounded transition-colors ${
                          deletingId === book._id ? "opacity-50" : ""
                        }`}
                      >
                        {deletingId === book._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HomePage;
