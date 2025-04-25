'use client'
// import { BRAND_LOGOS, HERO_CONTENT } from '../constants'
// import heroImg from "../assets/hero.jpg"
import { motion } from 'framer-motion'

const containerVarients = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { straggerChildren: 0.2 }, }
}
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
}

export default function HeroSection() {
    return (
        <motion.section
            variants={containerVarients}
            initial="hidden"
            animate="visible"
            className="pt-28 lg:pt-36">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center
            ">
                <motion.h1
                    variants={fadeInUp}
                    className="text-5xl lg:text-8xl my-4 font-semibold tracking-tighter bg-gradient-to-l dark:from-neutral-50 dark:via-neutral-300 dark:to-neutral-700 from-neutral-800 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                    <span >
                        Dev League <br />
                        Code Compete Conquer
                    </span>
                </motion.h1>
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl lg:text-5xl font-semibold tracking-tighter
                    mt-6 dark:text-neutral-400 text-neutral-400 max-w-xl">
                    Start your Challenge
                </motion.h2>
                <motion.h3
                    variants={fadeInUp}
                    className="text-xl tracking-tighter
                    mt-6 dark:text-neutral-400 text-neutral-400 max-w-xl">
                    Compete in thrilling coding hackathons.
                    Showcase your skills and win prizes.
                </motion.h3>

                <motion.div
                    variants={fadeInUp}
                    className="mt-6 space-x-4">
                    <a href="#" className='inline-block
                    border 
                    border-green-500
                    hover:border-green-300
                    text-green-400 hover:text-neutral-300 py-3 px-6 rounded-lg font-medium'>
                        Join the League
                    </a>
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                    className="mt-12">
                    <img src='/undraw_algorithm.svg' alt="Streamer Saas Interface" className='w-full h-auto rounded-3xl border border-neutral-800 mb-12' />
                </motion.div>
            </div>
        </motion.section>
    )
}
