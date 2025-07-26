'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddLyricPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    artist: '',
    content: '',
    image: '', // 👈 added image URL here
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.title || !form.artist || !form.content) {
      setError('All fields except image are required.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          userId: session?.user?.id,
        }),
      })

      if (!res.ok) throw new Error('Failed to save lyric')

      setSuccess('Lyric added successfully!')
      setForm({ title: '', artist: '', content: '', image: '' })

      setTimeout(() => router.push('/lyrics'), 1000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') return <p className="text-center mt-10">Checking session...</p>

  if (!session) {
    return <p className="text-center mt-10">Please sign in to add lyrics.</p>
  }

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Add New Lyric</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={form.artist}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Lyrics content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={6}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className={`bg-green-600 text-white px-4 py-2 rounded w-full ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Lyric'}
        </button>
      </form>
    </div>
  )
}
