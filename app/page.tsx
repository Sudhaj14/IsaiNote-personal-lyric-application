// app/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { signIn } from "next-auth/react" 

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  return (
    <div>
      {session ? (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back 👋</h2>

          <Link
            href="/lyrics"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Go to My Lyrics
          </Link>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Please sign in to manage your lyrics.</h1>
          <button
            onClick={() => signIn()}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  )
}
