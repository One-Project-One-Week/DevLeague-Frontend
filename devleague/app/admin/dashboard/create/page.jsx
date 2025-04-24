export default function CreatePage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold">Create Hackathon</h1>
                <form className="mt-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Hackathon Name</label>
                            <input id="name" type="text" placeholder="Hackathon Name" required className="border rounded-md p-2" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="description" className="text-sm font-medium">Description</label>
                            <textarea id="description" placeholder="Hackathon Description" required className="border rounded-md p-2"></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Create Hackathon</button>
                    </div>
                </form>
            </div>
        </div>
    )
}