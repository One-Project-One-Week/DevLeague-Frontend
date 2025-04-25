'use client'
import React from 'react'
import { ListAbout } from '../constants/index'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <div id='about' className='border-b border-neutral-900 pb-4'>
            <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className='my-20'
            >
                <h1 className='text-center text-4xl text-neutral-300 tracking-tight'>About Us</h1>
                <p className="mt-4 text-neutral-400  max-w-xl mx-auto">
                    We are a passionate team of developers and designers dedicated to creating innovative solutions that make a difference. Our mission is to empower individuals and organizations through technology, providing them with the tools they need to succeed in a rapidly changing digital landscape. With a focus on collaboration, creativity, and excellence, we strive to deliver exceptional results that exceed expectations.
                </p>
            </motion.div>

            <div>
                {ListAbout.map((list, index) => (
                    <div className="mb-8 flex flex-wrap lg:justify-center" key={index}>
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -100 }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-1/4">
                            <img
                                src={list.image}
                                alt={list.title}
                                width={180}
                                className='mb-6 rounded' />
                        </motion.div>
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 100 }}
                            transition={{ duration: 1 }}
                            className="w-full max-w-xl lg:w-3/4">
                            <h6 className='mb-2 text-neutral-300 font-semibold text-xl'>{list.title}</h6>
                            <p className='mb-4 text-neutral-400 text-[14px]'>{list.description}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}
