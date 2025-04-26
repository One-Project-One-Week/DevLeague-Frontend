<<<<<<< HEAD
'use client'
=======
'use client';
>>>>>>> ba49b58b4dc39640d501cf5d473aa377a92d516c
import Link from 'next/link';
import { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
<<<<<<< HEAD
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Navbar() {
  const [open, setOpen] = useState(false)
=======
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
export default function Navbar({ isAuthenticated, logout }) {
  isAuthenticated = isAuthenticated || false;
  const [open, setOpen] = useState(false);
>>>>>>> ba49b58b4dc39640d501cf5d473aa377a92d516c
  // const { mode, setMode } = useContext(ThemeContext)

  const toggleMenu = () => {
    setOpen(!open);
  };
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
<<<<<<< HEAD
          <Link href="/" className='text-neutral-200 hover:text-green-400'>
            Home
          </Link>
          <Link href="/hackathon" className='text-neutral-200 hover:text-green-400'>
            Hackathon
          </Link>
          <Link href="/leaderboard" className='text-neutral-200 hover:text-green-400'>
            Leaderboard
          </Link>
        </div>
        {/* Right: buttons (hidden on mobile) */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/user/auth/login" className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 transition">
            login
          </Link>
          <Avatar>
            <AvatarImage src="/avatar.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {/* Hambugar Icon for Mobile */}
        <div className="md:hidden">
          <button className='text-2xl border-r border-neutral-400 mr-2 px-2'>
            <Avatar >
=======
          <Link href="/" className="text-neutral-200 hover:text-green-400">
            Home
          </Link>
          <Link
            href="/hackathon"
            className="text-neutral-200 hover:text-green-400"
          >
            Hackathon
          </Link>
          <Link
            href="/leaderboard"
            className="text-neutral-200 hover:text-green-400"
          >
            Leaderboard
          </Link>
          {isAuthenticated && (
            <Link
              href="/leaderboard"
              className="text-neutral-200 hover:text-green-400"
            >
              Team
            </Link>
          )}
        </div>
        {/* Right: buttons (hidden on mobile) */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <Avatar>
                <AvatarImage src="/avatar.svg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="cursor-pointer border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-500/10 transition text-center hover:text-red-500"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/user/auth/login"
                className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 transition"
              >
                login
              </Link>
              <Link
                href="/user/auth/register"
                className="border border-neutral-700 text-white py-2 px-4 rounded-full hover:bg-neutral-500/10 transition text-center hover:text-green-400"
              >
                Register
              </Link>
            </>
          )}
        </div>
        {/* Hambugar Icon for Mobile */}
        <div className="md:hidden">
          <button className="text-2xl border-r border-neutral-400 mr-2 px-2">
            <Avatar>
>>>>>>> ba49b58b4dc39640d501cf5d473aa377a92d516c
              <AvatarImage src="/avatar.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
<<<<<<< HEAD
          <button onClick={toggleMenu} className='text-white focus:outline-none' aria-label={open ? "Close Menu" : "Open Menu"}>
=======
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label={open ? 'Close Menu' : 'Open Menu'}
          >
>>>>>>> ba49b58b4dc39640d501cf5d473aa377a92d516c
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-4 rounded-xl mt-2">
          <div className="flex flex-col space-y-4 text-[14px]">
<<<<<<< HEAD
            <Link href="/" className='text-neutral-200 hover:text-green-400'>
              Home
            </Link>
            <Link href="/hackathon" className='text-neutral-200 hover:text-green-400'>
              Hackathon
            </Link>
            <Link href="/leaderboard" className='text-neutral-200 hover:text-green-400'>
              Leaderboard
            </Link>
            <Link href="/team" className='text-neutral-200 hover:text-green-400'>
              Team
            </Link>
            <Link href="/user/auth/login" className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-500/10 transition text-center hover:text-green-400">
              Login
            </Link>
=======
            <Link href="/" className="text-neutral-200 hover:text-green-400">
              Home
            </Link>
            <Link
              href="/hackathon"
              className="text-neutral-200 hover:text-green-400"
            >
              Hackathon
            </Link>
            <Link
              href="/leaderboard"
              className="text-neutral-200 hover:text-green-400"
            >
              Leaderboard
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/team"
                  className="text-neutral-200 hover:text-green-400"
                >
                  Team
                </Link>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="cursor-pointer border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-500/10 transition text-center hover:text-red-500"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/user/auth/login"
                  className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-500/10 transition text-center hover:text-green-400"
                >
                  Login
                </Link>
                <Link
                  href="/user/auth/register"
                  className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-500/10 transition text-center hover:text-green-400"
                >
                  Register
                </Link>
              </>
            )}
>>>>>>> ba49b58b4dc39640d501cf5d473aa377a92d516c
          </div>
        </div>
      )}
    </nav>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> ba49b58b4dc39640d501cf5d473aa377a92d516c
}
