"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Book } from "../types/book";

function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/books");
        
        console.log("Fetched books raw data:", res.data);

        // Normalize keys (optional if backend already uses consistent keys)
        const normalized = res.data.map((b: Book) => ({
          ...b,
          isbn: b.isbn,
          year: b.publishedYear,
        }));
        setBooks(normalized);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/v1/books/${id}`);
      console.log("Deleted book with id:", id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Failed to delete book", error);
      alert("Delete failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 md:w-3/4 lg:w-2/3 mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">📚 Book Collection</h1>
        <Link
          href="/books/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add New Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Author</th>
                <th className="text-left px-4 py-2">ISBN</th>
                <th className="text-left px-4 py-2">Year</th>
                <th className="text-center px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {books.map((book, index) => (
                <tr key={book._id ?? index}>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.isbn}</td>
                  <td className="px-4 py-2">{book.publishedYear}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <Link
                      href={`/books/edit/${book._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
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
