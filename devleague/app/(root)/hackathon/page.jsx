'use client'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'

export default function HackathonPage() {
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
        <section className="">
            <div className="max-w-7xl mx-auto px-4 flex flex-col">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10 mt-10">
                    <h2 className="text-3xl lg:text-5xl mt-20 mb-10 tracking-tighter bg-gradient-to-t  from-neutral-00 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                        Hackathon Events
                    </h2>
                </motion.div>

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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                    <motion.div
                        custom={0}
                        variants={stepVarients}
                        className="bg-neutral-500/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col gap-3 relative">
                        <div className="absolute top-0 right-0 mt-10 mr-10">
                            <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">Upcoming</Badge>
                        </div>
                        <div
                            className="">
                            <img src="/img1.jpg" alt="img1" className='rounded-lg w-full h-52 object-cover' />
                        </div>
                        <div className="flex flex-col justify-center ">
                            <h3 className="text-xl text-neutral-300 font-semibold mb-4">Hackthon Title</h3>
                            <p className="text-neutral-400 mb-4 text-[14px]">Hackathon Description</p>
                            <div className="flex flex-row items-center mb-4">
                                <p className="text-neutral-400  text-[14px]">Participant</p>
                                <Badge variant="outline" className="ml-2 text-sm text-neutral-300 border border-green-400">100</Badge>
                            </div>
                            <div className="flex flex-row items-center mb-4 gap-5">

                                <p className="text-neutral-400  text-[14px]">Prize</p>
                                <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">$1,000</Badge>
                            </div>
                            <div className="flex flex-row items-center mb-4">
                                <p className="text-neutral-400  text-[14px]">Points</p>
                                <Badge variant="outline" className="ml-2 text-sm text-neutral-300 border border-green-400">50</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4 ">
                                <Badge variant="secondary">AI</Badge>
                                <Badge variant="secondary">Maching learning</Badge>
                                <Badge variant="secondary">Robotic</Badge>
                            </div>
                            <Link href="/hackathon/detail" className="mt-5 text-neutral-300 text-sm font-semibold bg-neutral-500/20 hover:bg-neutral-400 px-4 py-2 rounded-md text-center">View Details</Link>
                        </div>
                    </motion.div>
                    {/*  */}
                    <motion.div
                        custom={0}
                        variants={stepVarients}
                        className="bg-neutral-500/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col gap-3 relative">
                        <div className="absolute top-0 right-0 mt-10 mr-10">
                            <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">Upcoming</Badge>
                        </div>
                        <div
                            className="">
                            <img src="/img1.jpg" alt="img1" className='rounded-lg w-full h-52 object-cover' />
                        </div>
                        <div className="flex flex-col justify-center ">
                            <h3 className="text-xl text-neutral-300 font-semibold mb-4">Hackthon Title</h3>
                            <p className="text-neutral-400 mb-4 text-[14px]">Hackathon Description</p>
                            <div className="flex flex-row items-center mb-4">
                                <p className="text-neutral-400  text-[14px]">Participant</p>
                                <Badge variant="outline" className="ml-2 text-sm text-neutral-300 border border-green-400">100</Badge>
                            </div>
                            <div className="flex flex-row items-center mb-4 gap-5">

                                <p className="text-neutral-400  text-[14px]">Prize</p>
                                <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">$1,000</Badge>
                            </div>
                            <div className="flex flex-row items-center mb-4">
                                <p className="text-neutral-400  text-[14px]">Points</p>
                                <Badge variant="outline" className="ml-2 text-sm text-neutral-300 border border-green-400">50</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4 ">
                                <Badge variant="secondary">AI</Badge>
                                <Badge variant="secondary">Maching learning</Badge>
                                <Badge variant="secondary">Robotic</Badge>
                            </div>
                            <Link href="/hackathon/detail" className="mt-5 text-neutral-300 text-sm font-semibold bg-neutral-500/20 hover:bg-neutral-400 px-4 py-2 rounded-md text-center">View Details</Link>
                        </div>
                    </motion.div>
                    {/*  */}
                    <motion.div
                        custom={0}
                        variants={stepVarients}
                        className="bg-neutral-500/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col gap-3 relative">
                        <div className="absolute top-0 right-0 mt-10 mr-10">
                            <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">Upcoming</Badge>
                        </div>
                        <div
                            className="">
                            <img src="/img1.jpg" alt="img1" className='rounded-lg w-full h-52 object-cover' />
                        </div>
                        <div className="flex flex-col justify-center ">
                            <h3 className="text-xl text-neutral-300 font-semibold mb-4">Hackthon Title</h3>
                            <p className="text-neutral-400 mb-4 text-[14px]">Hackathon Description</p>
                            <div className="flex flex-row items-center mb-4">
                                <p className="text-neutral-400  text-[14px]">Participant</p>
                                <Badge variant="outline" className="ml-2 text-sm text-neutral-300 border border-green-400">100</Badge>
                            </div>
                            <div className="flex flex-row items-center mb-4 gap-5">

                                <p className="text-neutral-400  text-[14px]">Prize</p>
                                <Badge variant="outline" className="text-sm text-neutral-300 border border-green-400">$1,000</Badge>
                            </div>
                            <div className="flex flex-row items-center mb-4">
                                <p className="text-neutral-400  text-[14px]">Points</p>
                                <Badge variant="outline" className="ml-2 text-sm text-neutral-300 border border-green-400">50</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4 ">
                                <Badge variant="secondary">AI</Badge>
                                <Badge variant="secondary">Maching learning</Badge>
                                <Badge variant="secondary">Robotic</Badge>
                            </div>
                            <Link href="/hackathon/detail" className="mt-5 text-neutral-300 text-sm font-semibold bg-neutral-500/20 hover:bg-neutral-400 px-4 py-2 rounded-md text-center">View Details</Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section >
    )
}