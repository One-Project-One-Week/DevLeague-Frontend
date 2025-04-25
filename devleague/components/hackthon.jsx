'use client'
import { Context } from '../constants/index'
import { motion } from 'framer-motion'


export default function HackathonList() {
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
        <section id='hackathon'>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 ">
                    <h2 className="text-3xl lg:text-5xl mt-20 tracking-tighter bg-gradient-to-t dark:from-neutral-50 dark:via-neutral-300 dark:to-neutral-700 from-neutral-800 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                        Hackathon Events
                    </h2>
                    <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
                        Join our hackathon and showcase your coding skills. Collaborate with like-minded individuals, learn from experts, and compete for exciting prizes. Whether you're a beginner or an experienced developer, there's something for everyone. Don't miss out on this opportunity to grow your skills and network with industry professionals.
                    </p>
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Context.steps.map((step, index) => (
                        <motion.div
                            custom={index}
                            variants={stepVarients}
                            key={index} className="bg-neutral-500/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                                <p className="text-neutral-400 mb-4 text-[14px]">{step.description}</p>
                            </div>
                            <div className="flex justify-center">
                                <img src={step.imageSrc} alt={step.imageAlt} className='rounded-lg' />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    )
}
