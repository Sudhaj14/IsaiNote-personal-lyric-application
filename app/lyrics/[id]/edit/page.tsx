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
      <form onSubmit={handleSubmit} className="space-y-5 bg-black/60 text-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold">Edit Lyric</h2>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={form.artist}
        onChange={(e) => setForm({ ...form, artist: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <textarea
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <button className="bg-blue-600 text-white px-6 py-2 rounded-4xl">Save</button>
    </form>
  )
}
