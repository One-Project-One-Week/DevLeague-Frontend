export default function HackthonList() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Hackathon List</h1>
            <table className="min-w-full mt-4 border-collapse border border-gray-200">

                <thead>
                    <tr>
                        <th>Hackathon Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}