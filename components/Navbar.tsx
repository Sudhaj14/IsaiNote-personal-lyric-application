'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <div className="flex justify-center mt-6">
      <nav className="bg-black/70 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-lg flex items-center gap-12">
        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          IsaiNote
        </Link>

        {session ? (
          <>
            <Link
              href="/lyrics/new"
              className="bg-red-900 text-xl text-white font-bold px-4 py-1 rounded-full shadow-lg "
            >
              Add Lyrics
            </Link>
            {/* <span className="text-xl font-bold">Hello, {session.user?.name}</span> */}
            <button
              onClick={() => signOut()}
              className="bg-red-900 text-xl font-bold rounded-full shadow-lg  text-white px-4 py-1 "
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
            >
              Register
            </Link>
            <button
              onClick={() => signIn()}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Sign In
            </button>
          </>
        )}
      </nav>
    </div>
  )
}