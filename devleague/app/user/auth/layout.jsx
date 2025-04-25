export default function UserAuthLayout(
    { children }
) {
    return (
        <section className="flex min-h-svh flex-col items-center justify-center bg-stone-300 p-6 md:p-10 ">
            {children}
        </section>
    );
}