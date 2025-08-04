'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

interface FormData {
  title: string
  artist: string
  content: string
  image: string
}

export default function AddLyricPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    title: '',
    artist: '',
    content: '',
    image: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [redirecting, setRedirecting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
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

      toast.success('🎶 Lyric added successfully!', {
        position: 'top-center',
        theme: 'dark',
        style: {
          backgroundColor: '#1a0000',
          color: '#ff4c4c',
          fontWeight: 'bold',
          borderRadius: '8px',
        },
      })

      setForm({ title: '', artist: '', content: '', image: '' })

      setTimeout(() => {
        setRedirecting(true)
        setTimeout(() => router.push('/lyrics'), 700)
      }, 1000)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') return <p className="text-center mt-10">Checking session...</p>
  if (!session) return <p className="text-center mt-10">Please sign in to add lyrics.</p>

  return (
    <AnimatePresence>
      {!redirecting && (
        <motion.div
          key="form"
          className="max-w-lg mx-auto mt-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-bold text-center text-white drop-shadow">
            Add New Lyric
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-black/60 backdrop-blur-sm text-white p-6 rounded-xl shadow-xl border border-red-900"
          >
            {['title', 'artist', 'image'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={
                  field === 'image' ? 'Image URL (optional)' : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-red-700 bg-black/40 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 placeholder-red-300"
                required={field !== 'image'}
              />
            ))}

            <textarea
              name="content"
              placeholder="Lyrics content"
              value={form.content}
              onChange={handleChange}
              className="w-full border border-red-700 bg-black/40 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 placeholder-red-300"
              rows={6}
              required
            />

            {error && (
              <motion.p
                className="text-red-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-red-700 hover:bg-red-800 transition-all duration-300 text-white px-4 py-2 rounded-lg w-full shadow-md ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Lyric'}
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
