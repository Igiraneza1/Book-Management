"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewBookPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/books", form);
      console.log("Book added successfully");
      router.push("/books");
    } catch (error) {
      console.error("Failed to add book", error);
    }
  };

  return (
    <div className="w-1/3 p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
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

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
