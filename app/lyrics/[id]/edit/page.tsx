'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Lyric = {
  _id: string;
  title: string;
  artist: string;
  content: string;
};

export default function EditLyricPage() {
  const { id } = useParams()
  const router = useRouter()
  const [form, setForm] = useState<Lyric>({ title: '', artist: '', content: '', _id: '' })

  useEffect(() => {
    fetch(`/api/lyrics`)
      .then(res => res.json())
      .then((data: Lyric[]) => {
        const lyric = data.find((l) => l._id === id)
        if (lyric) setForm(lyric)
      })
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch(`/api/lyrics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    })
    router.push('/lyrics')
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-black/70 text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">Edit Lyric</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm text-gray-300">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-md bg-black text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter song title"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Artist</label>
          <input
            type="text"
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
            className="w-full p-3 rounded-md bg-black text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter artist name"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Lyrics</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-3 h-52 rounded-md bg-black text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
            placeholder="Write the lyrics here..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
