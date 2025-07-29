import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const { title, artist, content } = await req.json();
  await connectDB();

  const updated = await Lyrics.findByIdAndUpdate(
    id,
    { title, artist, content },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  await connectDB();
  await Lyrics.findByIdAndDelete(id);

  return NextResponse.json({ message: 'Deleted' });
}
