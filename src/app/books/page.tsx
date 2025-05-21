"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Book } from "../types/book";

function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/books");
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to delete book", error);
      if (axios.isAxiosError(error)) {
        alert(`Delete failed: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="w-1/2">
      <div className="flex justify-between items-center mt-5 max-w-3xl mx-auto">
        <h1 className="font-bold text-3xl">Book Collection</h1>
        <Link
          href="/books/new"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
        >
          + Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
          <p className="mb-4 text-gray-500">
            Get started by adding your first book to the collection.
          </p>
          <Link
            href="/books/new"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
          >
            + Add New Book
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {books.map((book) => (
            <div
              key={book.id} // ✅ Make sure `book.id` is unique
              className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{book.title}</h3>
                <div className="space-y-1 mt-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">ISBN:</span> {book.ISBN}
                  </p>
                  {book.year && (
                    <p className="text-gray-600">
                      <span className="font-medium">Year:</span> {book.year}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-3 rounded ml-4 transition-colors"
                aria-label="Delete book"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
