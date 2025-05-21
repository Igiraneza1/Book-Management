"use client";

import React, { useState, useEffect } from "react";
import { Book } from "../../types/book";

type BookFormProps = {
  isEdit: boolean;
  initialData?: Book;
  onSubmit: (formData: Book) => void;
  loading: boolean;
};

const BookForm = ({ isEdit, initialData, onSubmit, loading }: BookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    _id: "",
    title: "",
    author: "",
    isbn: "",
    publishedYear: 0, // optional if needed
  });

  useEffect(() => {
      if (initialData) {
        setFormData({
          _id: initialData._id || "",
          title: initialData.title || "",
          author: initialData.author || "",
          isbn: initialData.isbn,
          publishedYear: initialData.publishedYear,
        });
      }
    }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Book) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-5 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-center">
        {isEdit ? "Edit Book" : "Add New Book"}
      </h1>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
          ISBN
        </label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
        type="number"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>


      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
      >
        {loading ? "Saving..." : isEdit ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
