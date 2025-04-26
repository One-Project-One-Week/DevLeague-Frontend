"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const mockTeams = [
  { id: 1, name: "Code Wizards", members: 3 },
  { id: 2, name: "Bug Busters", members: 4 },
  { id: 3, name: "React Ninjas", members: 2 },
  { id: 4, name: "Code", members: 3 },
  { id: 5, name: "Varriors", members: 3 },
  { id: 6, name: "Dello", members: 3 },
  { id: 7, name: "Yello Yeeoo teeeekkkk aksdflkj", members: 3 },
  { id: 8, name: "Ok", members: 3 },
]

const mockTeamMembers = [
  { name: "Shinn", initials: "SH" },
  { name: "Alex", initials: "AL" },
  { name: "Nova", initials: "NO" },
]

export default function TeamPage() {
  const [hasTeam, setHasTeam] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [profile, setProfile] = useState(null)

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfile(URL.createObjectURL(file))
    }
  }

  const handleTeamCreate = () => {
    if (!teamName || !profile) return
    setHasTeam(true)
  }

  const handleJoinTeam = (teamId) => {
    console.log("Joined team:", teamId)
    setHasTeam(true)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 flex flex-col pt-40 pb-20">
      <div className="flex flex-col lg:flex-row gap-30">
        {/* Left Column */}
        <motion.div
          className="w-full lg:w-3/5"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="rounded-xl p-6 shadow-lg border bg-[#130F3F]/60">
            <h3 className="text-2xl font-semibold text-[#EAEAEA] mb-6">
              Available Teams
            </h3>
            <Table className="text-[#EAEAEA] text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#1DF53A]">Team</TableHead>
                  <TableHead className="text-[#1DF53A]">Members</TableHead>
                  {!hasTeam && (
                    <TableHead className="text-[#1DF53A]">Action</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeams.map((team, idx) => (
                  <TableRow key={team.id}>
                    <TableCell>{team.name}</TableCell>
                    <TableCell className="text-center">
                      {team.members}
                    </TableCell>
                    {!hasTeam && (
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="text-sm text-neutral-300 border border-green-400 hover:bg-[#17c72f]">
                              Join
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#0D0D0E] border border-[#1DF53A] text-[#EAEAEA]">
                            <AlertDialogHeader>
                              Are you sure you want to join "{team.name}"?
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleJoinTeam(team.id)}
                              >
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="w-full lg:w-2/5"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="rounded-xl p-6 shadow-lg border bg-[#130F3F]/60">
            {!hasTeam ? (
              <>
                <h3 className="text-2xl font-semibold text-[#EAEAEA] mb-6">
                  Create Your Team
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-[#EAEAEA] mb-3">Team Name</Label>
                    <Input
                      className="bg-[#0D0D0E]  text-[#EAEAEA] placeholder:text-neutral-500 mb-4"
                      placeholder="Enter team name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-[#EAEAEA] mb-3">
                      Team Profile Photo
                    </Label>
                    <Input
                      type="file"
                      accept="image/*"
                      className="text-[#EAEAEA] mb-4"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {profile && (
                    <div className="mt-2">
                      <img
                        src={profile}
                        alt="Team Profile"
                        className="w-20 h-20 rounded-full border border-[#1DF53A]"
                      />
                    </div>
                  )}

                  <Button
                    className="mx-auto block px-4 py-2text-sm text-neutral-300 border border-green-400 hover:bg-[#17c72f] mb-1"
                    onClick={handleTeamCreate}
                  >
                    Create
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={profile}
                    alt="Team Avatar"
                    className="w-20 h-20 rounded-full border border-[#1DF53A]"
                  />
                  <div>
                    <h3 className="text-xl text-[#EAEAEA] font-semibold">
                      {teamName}
                    </h3>
                    <p className="text-sm text-[#EAEAEA]/70">Team Leader</p>
                  </div>
                </div>

                <h4 className="text-[#EAEAEA] mb-3 font-semibold">
                  Team Members
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {mockTeamMembers.map((member, idx) => (
                    <motion.div
                      key={idx}
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      custom={idx}
                      className="flex items-center space-x-3 bg-[#0D0D0E]/70 p-2 rounded-lg"
                    >
                      <Avatar className="h-9 w-9 border border-[#1DF53A]">
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <p className="text-[#EAEAEA] text-sm">{member.name}</p>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
