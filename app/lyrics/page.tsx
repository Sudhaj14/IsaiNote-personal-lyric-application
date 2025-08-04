'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Lyric {
  _id: string
  title: string
  artist: string
  image?: string
}

export default function LyricsPage() {
  const { data: session } = useSession()
  const [lyrics, setLyrics] = useState<Lyric[]>([])

  const fetchLyrics = useCallback(async () => {
    if (!session?.user?.id) return
    const res = await fetch(`/api/lyrics?userId=${session.user.id}`)
    const data = await res.json()
    setLyrics(data)
  }, [session?.user?.id])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lyric?")
    if (!confirmDelete) return

    await fetch(`/api/lyrics/${id}`, { method: 'DELETE' })
    toast.success('Lyric deleted successfully!')
    fetchLyrics()
  }

  useEffect(() => {
    fetchLyrics()
  }, [fetchLyrics])

  if (!session) {
    return <p className="text-center mt-10 text-white">Please sign in to view your lyrics.</p>
  }

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto w-full">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center text-white-400">My Lyrics</h1>

      {/* Responsive card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {lyrics.map((lyric) => (
          <div
            key={lyric._id}
            className="rounded-2xl bg-gradient-to-b from-zinc-800 to-black text-white shadow-lg hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-4 min-h-[280px]"
          >
            <Link href={`/lyrics/${lyric._id}`} className="w-full">
              <div
                className="w-full h-40 bg-center bg-cover rounded-md"
                style={{
                  backgroundImage: `url(${lyric.image || '/default-bg.jpg'})`,
                }}
              />
            </Link>

            <div className="w-full text-center mt-4">
              <Link href={`/lyrics/${lyric._id}`}>
                <h2 className="text-xl font-bold text-white-400 hover:underline">{lyric.title}</h2>
              </Link>
              <p className="text-sm text-gray-300">{lyric.artist}</p>
            </div>

            <div className="flex gap-4 mt-auto pt-6">
              <Link href={`/lyrics/${lyric._id}/edit`}>
                <button className="text-sm px-4 py-1 border border-blue-400 text-blue-400 rounded-md hover:bg-blue-400 hover:text-black transition-all">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(lyric._id)}
                className="text-sm px-4 py-1 border border-red-400 text-red-400 rounded-md hover:bg-red-400 hover:text-black transition-all"
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
