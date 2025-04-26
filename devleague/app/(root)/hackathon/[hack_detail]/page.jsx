'use client'
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { Users } from "lucide-react"
import WinnerCard from "@/components/winner-card"

export default function HackathonDetail() {
    const [show, setShow] = useState(true)

    const stepVarients = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            }
        })
    }
    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className="w-[800px] max-w-full px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2,
                            }
                        }
                    }}
                    className=" mt-32 mb-10">
                    <motion.div
                        custom={0}
                        variants={stepVarients}
                        className=" bg-neutral-500/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col justify-between relative">
                        <div className="absolute top-0 right-0 mt-10 mr-10">
                            <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">Upcoming</Badge>
                        </div>
                        <div
                            className="relative">
                            <img src="/img1.jpg" alt="img1" className='rounded-lg w-full h-64 object-cover' />
                            <div className="absolute -bottom-6 left-3">
                                <img src="/avatar.svg" alt="" width={60} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mt-10 gap-3">
                            <h3 className="text-xl text-neutral-300 font-semibold mb-4">Hackthon Title</h3>

                            <div className="flex gap-3">
                                <Users className="text-green-400" />
                                <span className="text-neutral-300">100</span>
                            </div>
                            <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">Overview</Badge>

                            <p className="text-neutral-400 mb-4 text-[14px]">Overview Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aliquid animi rerum sit nobis eaque ex sint amet cum delectus facere totam porro quos quidem ipsam distinctio, necessitatibus cupiditate tempora!</p>

                            <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400 mb-3">Prize Pool : <span className="font-bold">$500</span></Badge>
                            <div className="flex flex-col gap-3">
                                <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">Date & time</Badge>
                                <ul className="flex flex-col items-start mb-4 border-l-2 border-neutral-400 pl-4 gap-3">
                                    <li className="">
                                        <span className="text-neutral-400 text-[14px]">Start Date:</span>
                                        <span className="text-neutral-300 ml-2 text-sm">12/12/2023</span>
                                    </li>
                                    <li>
                                        <span className="text-neutral-400 text-[14px]">Start Time:</span>
                                        <span className="text-neutral-300 ml-2 text-sm">10:00 AM</span>
                                    </li>
                                    <li className="mb-2">
                                        <span className="text-neutral-400 text-[14px]">End Date:</span>
                                        <span className="text-neutral-300 ml-2 text-sm">12/12/2023</span>
                                    </li>
                                    <li>
                                        <span className="text-neutral-400 text-[14px]">End Time:</span>
                                        <span className="text-neutral-300 ml-2 text-sm">10:00 PM</span>
                                    </li>
                                    <li className="mb-2">
                                        <span className="text-neutral-400 text-[14px]">Location:</span>
                                        <span className="text-neutral-300 ml-2 text-sm">Online</span>
                                    </li>
                                </ul>
                            </div>
                            <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">Rules</Badge>
                            <div className="flex flex-row items-center gap-5 border border-gray-500/20 p-4 rounded-lg">
                                <ul className="text-sm text-neutral-300">
                                    <li>Some Rules</li>
                                    <li>Some Rules</li>
                                    <li>Some Rules</li>
                                    <li>Some Rules</li>
                                    <li>Some Rules</li>
                                </ul>
                            </div>
                            {show && (
                                <>
                                    <WinnerCard />
                                </>
                            )
                            }
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section >
    );
}