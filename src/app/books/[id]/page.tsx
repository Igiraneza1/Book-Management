"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Book } from "../../types/book"; 

export default function BookDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Failed to load book. Please check if the book ID exists or if the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading)
    return (
      <p className="p-6 text-center text-gray-600 text-lg font-medium">Loading...</p>
    );
  if (!book)
    return (
      <p className="p-6 text-center text-red-500 text-lg font-semibold">Book not found</p>
    );

  return (
    <div className="p-6 sm:p-8 max-w-full sm:max-w-xl mx-auto bg-gray-200 shadow-md rounded-md">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 ">{book.title}</h1>
      <div className="space-y-4 text-gray-800 text-base sm:text-lg">
        <p>
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p>
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>
        <p>
          <span className="font-semibold">Published Year:</span> {book.publishedYear}
        </p>
      </div>
    </div>
  );
}
