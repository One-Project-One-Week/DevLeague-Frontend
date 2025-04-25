import Navbar from "@/components/navbar";

export default function HomeLayout({ children }) {
    return (
        <main className=" antialiased bg-gradient-to-b from-slate-950 from-20%  to-gray-900 to-60%">
            <Navbar />
            {children}
        </main>
    );
}
