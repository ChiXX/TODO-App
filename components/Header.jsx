import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">My TODO App</h1>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/addTopic" className="text-gray-700 hover:text-blue-600">
            Add Task
          </Link>
        </nav>
      </div>
    </header>
  );
}
