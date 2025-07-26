// components/Navbar.tsx
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-green-600">
        LyricsManager
      </Link>

      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <Link
              href="/lyrics/new"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Add Lyrics
            </Link>
            <span className="text-sm">Hello, {session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
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
      </div>
    </nav>
  )
}
