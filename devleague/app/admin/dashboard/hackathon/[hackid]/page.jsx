"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { data } from "@/components/hack-table"

const fetchTeamsByHackathon = (hackid) => [
  {
    id: "t1",
    number: 1,
    teamName: "Alpha Team",
    projectLink: "https://alpha.dev",
    rank: null,
    remark: "",
  },
  {
    id: "t2",
    number: 2,
    teamName: "Beta Builders",
    projectLink: "",
    rank: null,
    remark: "",
  },
  {
    id: "t3",
    number: 3,
    teamName: "Gamma Group",
    projectLink: "https://gamma.dev",
    rank: null,
    remark: "",
  },
  {
    id: "t4",
    number: 4,
    teamName: "Delta Devs",
    projectLink: "",
    rank: null,
    remark: "",
  },
]

export default function HackathonDetailPage() {
  const { hackid } = useParams()
  const hackathon = data.find((h) => h.id === hackid)
  const title = hackathon ? hackathon.name : `Hackathon ${hackid}`

  const [teams, setTeams] = useState(fetchTeamsByHackathon(hackid))
  const [open, setOpen] = useState(false)

  // Rank
  const used = teams.map((t) => t.rank).filter(Boolean)
  const allRanks = ["1st", "2nd", "3rd"]

  const columns = [
    {
      accessorKey: "number",
      header: "#",
      cell: ({ row }) => row.original.number,
    },
    {
      accessorKey: "teamName",
      header: "Team Name",
      cell: ({ row }) => row.original.teamName,
    },
    {
      accessorKey: "projectLink",
      header: "Project Link",
      cell: ({ row }) =>
        row.original.projectLink ? (
          <a
            href={row.original.projectLink}
            target="_blank"
            className="text-blue-600 underline"
          >
            View
          </a>
        ) : (
          <span className="text-gray-500 italic">Not yet</span>
        ),
    },
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => {
        const id = row.original.id
        return (
          <Select
            value={row.original.rank || ""}
            onValueChange={(value) => handleRankChange(id, value)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Assign" />
            </SelectTrigger>
            <SelectContent>
              {allRanks.map((r) => (
                <SelectItem
                  key={r}
                  value={r}
                  disabled={used.includes(r) && row.original.rank !== r}
                >
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      },
    },
    {
      accessorKey: "remark",
      header: "Feedback",
      cell: ({ row }) => (
        <Textarea
          placeholder="Write feedback..."
          value={row.original.remark}
          onChange={(e) => handleRemarkChange(row.original.id, e.target.value)}
          className="min-w-[200px]"
        />
      ),
    },
  ]

  const table = useReactTable({
    data: teams,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  function handleRankChange(teamId, rank) {
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, rank } : t)))
  }
  function handleRemarkChange(teamId, remark) {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, remark } : t))
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6"> {title} </h1>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex justify-end">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button>Submit Rankings</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to submit these rankings and feedback?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex justify-end space-x-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setOpen(false)
                    alert("Rankings submitted!")
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
