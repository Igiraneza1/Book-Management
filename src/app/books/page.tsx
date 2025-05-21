import React from 'react';
import { Book } from "../types/book";

function HomePage() {
  const books: Book[] = [];

  return (
    <div className="w-1/2">
      <div className="flex justify-between items-center mt-5 w-full max-w-3xl mx-auto">
        <h1 className="font-bold text-3xl">Book Collection</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + Add New Book
        </button>
      </div>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 ">
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
          <p className="mb-4 text-gray-500">Get started by adding your first book to the collection.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            + Add New Book
          </button>
        </div>
      ) : (
        <div className="mt-10">
          {books.map((book) => (
            <div key={book.id} className="border p-4 rounded mb-4">
              <h3 className="font-bold">{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.ISBN}</p>
              <p>{book.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
