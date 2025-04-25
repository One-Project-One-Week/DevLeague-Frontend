import Navbar from "@/components/navbar";

export default function Layout({ children }) {
  return (
    <main className="h-screen text-sm text-neutral-300 antialiased ">
      <Navbar />
      {children}
    </main>
  );
}
