import { HackathonListTable } from "@/components/hack-table"

export default function HackathonPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Hackathon List
        </h1>
        <HackathonListTable />
      </div>
    </div>
  )
}
