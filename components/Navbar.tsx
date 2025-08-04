'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <motion.div
      className="flex justify-center mt-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="bg-black/70 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-lg flex items-center gap-10 sm:gap-12">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:scale-105 transition-transform"
        >
          IsaiNote
        </Link>

        {session ? (
          <>
            <Link
              href="/lyrics/new"
              className="bg-red-900 text-xl font-semibold px-4 py-1 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Add Lyrics
            </Link>
            <motion.button
              onClick={() => signOut()}
              className="bg-red-900 text-xl font-semibold rounded-full shadow-lg text-white px-4 py-1 transition-transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          </>
        ) : (
          <>
            <Link
              href="/auth/register"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded-full transition-transform hover:scale-105"
            >
              Register
            </Link>
            <motion.button
              onClick={() => signIn()}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-1 rounded-full transition-transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </>
        )}
      </nav>
    </motion.div>
  )
}
