export default function AdminAuthLayout({ children }) {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      {children}
    </section>
  )
}
