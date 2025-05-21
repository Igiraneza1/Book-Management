"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Book } from "../../../types/book";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Book>({
    _id: "",
    title: "",
    author: "",
    isbn: "",
    publishedYear: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/books/${id}`);
        const bookData = res.data;

        setForm({
          _id: bookData._id || "", // use _id, not id
          title: bookData.title || "",
          author: bookData.author || "",
          isbn: bookData.isbn || "",
          publishedYear: bookData.publishedYear || 0,
        });
      } catch (error) {
        console.error("Failed to fetch book", error);
        alert("Failed to load book data.");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "publishedYear" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/v1/books/${form._id}`, form);
      alert("Book updated successfully!");
      router.push(`/books`);
    } catch (error) {
      console.error("Failed to update book", error);
      alert("Failed to update book. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="publishedYear"
          value={form.publishedYear}
          onChange={handleChange}
          placeholder="Published Year"
          required
          className="border p-2 rounded"
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Update Book
          </button>
          <button
            type="button"
            onClick={() => router.push(`/books`)}
            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
