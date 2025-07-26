// app/api/lyrics/[id]/route.ts
import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: any) {
  const { id } = params
  const { title, artist, content } = await req.json()
  await connectDB()

  const updated = await Lyrics.findByIdAndUpdate(id, { title, artist, content }, { new: true })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: any) {
  const { id } = params
  await connectDB()

  await Lyrics.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Deleted' })
}
