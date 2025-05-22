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
          _id: bookData._id || "", 
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
  

<div className="w-full max-w-md p-6 mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3">
  
  <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <label className="flex flex-col gap-1">
      Title
      <input
        type="text"
        name="title"
        placeholder="Enter book title"
        value={form.title}
        onChange={handleChange}
        required
        className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </label>

    <label className="flex flex-col gap-1">
      Author
      <input
        type="text"
        name="author"
        placeholder="Enter author name"
        value={form.author}
        onChange={handleChange}
        required
        className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </label>

    <label className="flex flex-col gap-1">
      ISBN
      <input
        type="text"
        name="isbn"
        placeholder="Enter ISBN number"
        value={form.isbn}
        onChange={handleChange}
        required
        className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </label>

    <label className="flex flex-col gap-1">
      Published Year
      <input
        type="number"
        name="publishedYear"
        placeholder="E.g., 2023"
        value={form.publishedYear}
        onChange={handleChange}
        required
        className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </label>

    <div className="flex space-x-4">
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex-grow"
      >
        Update Book
      </button>
      <button
        type="button"
        onClick={() => router.push(`/books`)}
        className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition flex-grow"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  );
}
