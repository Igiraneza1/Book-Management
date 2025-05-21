"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Book } from "../../types/book";

export default function BookDetailsPage() {
  const { id } = useParams();
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


  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p className="mt-4">{book.publishedYear}</p>
    </div>
  );
}
