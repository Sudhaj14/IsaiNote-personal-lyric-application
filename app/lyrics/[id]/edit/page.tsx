'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditLyricPage() {
  const { id } = useParams()
  const router = useRouter()
  const [form, setForm] = useState({ title: '', artist: '', content: '' })

  useEffect(() => {
    fetch(`/api/lyrics`)
      .then(res => res.json())
      .then(data => {
        const lyric = data.find((l: any) => l._id === id)
        if (lyric) setForm(lyric)
      })
  }, [id])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch(`/api/lyrics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    })
    router.push('/lyrics')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-4 bg-white p-6 shadow rounded">
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
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  )
}
