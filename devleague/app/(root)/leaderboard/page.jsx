"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const dummyData = [
  { username: "alice_dev", points: 2300 },
  { username: "code_master", points: 2100 },
  { username: "pixel_wizard", points: 2000 },
  { username: "dev_john", points: 1800 },
  { username: "Hi It's me", points: 1500 },
  { username: "stack_queen", points: 34999 },
  { username: "asdf", points: 234 },
  { username: "123", points: 2039 },
  { username: "Hello", points: 128 },
  { username: "hahahha", points: 12 },
  { username: "stack_queen", points: 30 },
  { username: "Help", points: 1 },
  { username: "What da Hell", points: 2 },
  { username: "Noooooooo", points: 5 },
]

const sortedData = [...dummyData].sort((a, b) => b.points - a.points)

export default function Leaderboard({ leaderboardData = sortedData }) {
  return (
    <div className="max-w-7xl mx-auto px-4 flex flex-col p-20">
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 "
      >
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mt-16 px-4"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r dark:from-neutral-50 dark:to-neutral-400 from-neutral-800 to-neutral-300 bg-clip-text text-transparent mb-8">
            Leaderboard
          </h2>

          <div className="rounded-xl overflow-hidden border border-neutral-800 shadow-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-900">
                  <TableHead className="text-center text-green-400 text-lg">
                    Rank
                  </TableHead>
                  <TableHead className="text-center text-green-400 text-lg">
                    Username
                  </TableHead>
                  <TableHead className="text-center text-green-400 text-lg text-right pr-10">
                    Points
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {leaderboardData.map((user, index) => {
                  const isTopThree = index < 3
                  const rankClass = cn(
                    "font-bold",
                    index === 0 && "text-yellow-400",
                    index === 1 && "text-gray-300",
                    index === 2 && "text-orange-500"
                  )

                  return (
                    <TableRow
                      key={user.username}
                      className={cn(
                        isTopThree
                          ? "bg-neutral-800/80"
                          : "hover:bg-neutral-900 transition-colors"
                      )}
                    >
                      <TableCell className={cn("text-neutral-200", rankClass)}>
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : index + 1}
                      </TableCell>
                      <TableCell className={cn("text-neutral-300", rankClass)}>
                        {user.username}
                      </TableCell>
                      <TableCell className="text-neutral-200 text-right pr-10">
                        {user.points}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
