"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Book } from "../types/book";

function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  

  // Fetch books on component mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/books/${id}`);
      // Remove deleted book from state to update UI
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  return (
    <div className="w-1/2">
      <div className="flex justify-between items-center mt-5 w-full max-w-3xl mx-auto">
        <h1 className="font-bold text-3xl">Book Collection</h1>
        <Link
          href="/books/new"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md p-1"
        >
          + Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 ">
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
          <p className="mb-4 text-gray-500">
            Get started by adding your first book to the collection.
          </p>
          <Link
            href="/books/new"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md p-1"
          >
            + Add New Book
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          {books.map((book) => (
            <div
              key={book.id}
              className="border p-4 rounded mb-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold">{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.ISBN}</p>
                <p>{book.description}</p>
              </div>
              <button
                onClick={() => handleDelete(book.id!)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-4"
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
