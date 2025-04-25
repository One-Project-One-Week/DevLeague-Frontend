import Navbar from "@/components/navbar";

export default function Layout({ children }) {
  return (
    <main className="h-screen antialiased">
      <Navbar />
      {children}
    </main>
  );
}
