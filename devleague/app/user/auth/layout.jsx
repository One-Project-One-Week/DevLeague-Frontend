import Navbar from "@/components/navbar";
export default function UserAuthLayout(
    { children }
) {
    return (
        <section className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-b from-slate-950 from-20%  to-gray-900 to-60%">
            <Navbar />
            {children}
        </section>
    );
}