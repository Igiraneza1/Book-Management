'use client'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="text-white w-full sm:w-64 bg-blue-600 border-r px-6 py-8 shadow-md h-auto sm:h-screen">
      <Link href="/" className="text-lg font-bold mb-8 border-b border-white pb-4 block">
        <strong className="bg-white rounded-md mr-2">📑</strong> Book Manager
      </Link>
      <nav className="space-y-4">
        <p className="mt-5 text-gray-300">Navigation</p>
        <Link href="/books" className="block hover:bg-blue-500 focus:bg-blue-700 rounded-md p-1 mt-3">📚 All Books</Link>
        <Link href="/books/new" className="block hover:bg-blue-500 focus:bg-blue-700 rounded-md p-1">➕ Add New Book</Link>
      </nav>
    </aside>
  )
}
