// import Sidebar from './_components/Sidebar'; 

export default function DashboardLayout({
    children,
}) {
    return (
        <div className="flex flex-row h-screen">
            {/* <Sidebar /> */}
            <main>
                {children}
            </main>
        </div>
    );
}