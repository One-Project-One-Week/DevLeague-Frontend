import { motion } from "framer-motion"

export default function WinnerCard() {
    const childVarients = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    }
    return (
        <section className=''>
            <div className="max-w-7xl mx-auto px-4 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className='text-center'>
                    <h2 className='text-3xl lg;text-5xl mt-20 
                        tracking-tighter
                        bg-gradient-to-t  from-neutral-800 via-neutral-300 to-neutral-400
                        bg-clip-text
                        text-transparent mb-10
                        '>
                        Top Three
                    </h2>
                </motion.div>
                <motion.div
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.5,
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <motion.div
                        variants={childVarients}
                        custom={0}
                        className={`p-8 rounded-xl shadow-lg bg-neutral-500/20`}>
                        <div className="text-center mb-4">
                            <span className="bg-green-600 text-neutral-300 text-[18px] py-1 px-3 rounded-md uppercase">
                                Wiinner
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-lg lg:text-xl mb-4 tracking-tighter  text-neutral-300">
                                Team Name
                            </h3>
                            <ul className="mb-8 space-y-2 text-neutral-400">
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={childVarients}
                        custom={0}
                        className={`p-8 rounded-xl shadow-lg bg-neutral-500/20`}>
                        <div className="text-center mb-4">
                            <span className="bg-green-600 text-neutral-300 text-[18px] py-1 px-3 rounded-md uppercase">
                                Wiinner
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-lg lg:text-xl mb-4 tracking-tighter  text-neutral-300">
                                Team Name
                            </h3>
                            <ul className="mb-8 space-y-2 text-neutral-400">
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={childVarients}
                        custom={0}
                        className={`p-8 rounded-xl shadow-lg bg-neutral-500/20`}>
                        <div className="text-center mb-4">
                            <span className="bg-green-600 text-neutral-300 text-[18px] py-1 px-3 rounded-md uppercase">
                                Wiinner
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-lg lg:text-xl mb-4 tracking-tighter  text-neutral-300">
                                Team Name
                            </h3>
                            <ul className="mb-8 space-y-2 text-neutral-400">
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                                <li
                                    className="flex items-center">
                                    <span className='inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2'>
                                    </span>
                                    team member list
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section >
    )
}