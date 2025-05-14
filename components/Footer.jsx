export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My TODO App. All rights reserved.
      </div>
    </footer>
  );
}