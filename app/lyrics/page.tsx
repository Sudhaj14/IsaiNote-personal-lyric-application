'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Lyric {
  _id: string
  title: string
  artist: string
  image?: string 
}

export default function LyricsPage() {
  const { data: session } = useSession()
  const [lyrics, setLyrics] = useState<Lyric[]>([])

  const fetchLyrics = async () => {
    const res = await fetch(`/api/lyrics?userId=${session?.user?.id}`)
    const data = await res.json()
    setLyrics(data)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/lyrics/${id}`, { method: 'DELETE' })
    fetchLyrics()
  }

  useEffect(() => {
    if (session?.user?.id) fetchLyrics()
  }, [session])

  if (!session) {
    return <p className="text-center mt-10">Please sign in to view your lyrics.</p>
  }

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">My Lyrics</h1>

      {/* Responsive card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {lyrics.map((lyric) => (
          <div
            key={lyric._id}
            className="rounded-xl shadow-md overflow-hidden bg-zinc-900 text-white flex flex-col items-center p-4 min-h-[260px]"
          >
            {/* Image section */}
            <div
              className="w-full h-42 bg-center bg-cover rounded-md"
              style={{
                backgroundImage: `url(${lyric.image || '/default-bg.jpg'})`,
              }}
            />

            {/* Song info */}
            <div className="w-full text-center mt-4">
              <h2 className="text-xl font-semibold">{lyric.title}</h2>
              <p className="text-sm text-gray-400">{lyric.artist}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-6 mt-auto pt-6">
              <Link href={`/lyrics/${lyric._id}/edit`}>
                <button className="text-blue-400 hover:text-blue-300 text-lg font-medium">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(lyric._id)}
                className="text-red-400 hover:text-red-300 text-lg font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
