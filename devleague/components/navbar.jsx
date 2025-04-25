'use client'
import Link from 'next/link';
import { useState, useContext } from 'react'
import { Menu, X } from 'lucide-react';
// import logo from "../assets/logo.png"
// import { RiCloseFill, RiMenu3Line } from '@remixicon/react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
// import ThemeContext from '../context/theme';

export default function Navbar() {
    const [open, setOpen] = useState(false)
    // const { mode, setMode } = useContext(ThemeContext)

    const toggleMenu = () => {
        setOpen(!open)
    }
    // const toggleMode = () => {
    //     setMode(!mode)
    // }
    return (
        <nav className='fixed top-4 left-0 right-0 z-50 m-2'>
            <div className="text-neutral-50 black/10 backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex justify-between items-center rounded-xl border border-neutral-800">
                <Link href="/">
                    <img src='/logoInterm.svg' alt="logo" width={55} />
                </Link>
                {/* hidden on mobile */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className='hover:text-neutral-200'>
                        Home
                    </Link>
                    <Link href="/hackathon" className='hover:text-neutral-200'>
                        Hackathon
                    </Link>
                    <Link href="/leaderboard" className='hover:text-neutral-200'>
                        Leaderboard
                    </Link>
                </div>
                {/* Right: buttons (hidden on mobile) */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Link href="/user/auth/login" className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 transition">
                        login
                    </Link>
                    <button className='text-2xl border-l border-neutral-400 px-4'>
                        <MdLightMode className='text-neutral-200' />
                        {/* {mode ?
                            <>
                                <MdLightMode className='text-neutral-200' />
                            </> :
                            <>
                                <MdDarkMode className='text-neutral-900' />
                            </>} */}
                    </button>
                </div>
                {/* Hambugar Icon for Mobile */}
                <div className="md:hidden">
                    <button className='text-2xl border-r border-neutral-400 mr-2 px-2'>
                        <MdLightMode className='text-neutral-200' />
                        {/* {mode ?
                            <>
                                <MdLightMode className='text-neutral-200' />
                            </> :
                            <>
                                <MdDarkMode className='text-neutral-900' />
                            </>} */}
                    </button>
                    <button onClick={toggleMenu} className='text-white focus:outline-none' aria-label={open ? "Close Menu" : "Open Menu"}>
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {/* mobile menu */}
            {open && (
                <div className="md:hidden bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-4 rounded-xl mt-2">
                    <div className="flex flex-col space-y-4">
                        <a href="#" className='hover:text-neutral-200'>
                            Home
                        </a>
                        <a href="#" className='hover:text-neutral-200'>
                            Hackathon
                        </a>
                        <a href="#" className='hover:text-neutral-200'>
                            Team
                        </a>
                        <a href="#" className='hover:text-white
                        '>
                            Login
                        </a>
                        <a href="#" className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 transition text-center">
                            Login
                        </a>
                        <a href="#" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition text-center">
                            Start Free Trial
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}

