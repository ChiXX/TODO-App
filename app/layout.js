import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";


export const metadata = {
  title: "My TODO APP",
  description: "React+Next+MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
