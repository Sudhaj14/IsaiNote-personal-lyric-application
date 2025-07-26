// app/api/lyrics/route.ts
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const lyrics = await Lyrics.find({ userId: session.user?.id })
  return NextResponse.json(lyrics)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, artist, content, image } = await req.json() // <-- Include image

  await connectDB()

  const newLyric = await Lyrics.create({
    title,
    artist,
    content,
    image, // <-- Save image URL
    userId: session.user?.id,
  })

  return NextResponse.json(newLyric)
}

