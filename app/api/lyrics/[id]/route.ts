import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'
import { NextRequest, NextResponse } from 'next/server'

type Context = {
  params: { id: string }
};

export async function PUT(req: NextRequest, context: Context) {
  // ✅ Access params after function begins
  const { params } = context;
  const { id } = params;

  const { title, artist, content } = await req.json();
  await connectDB();

  const updated = await Lyrics.findByIdAndUpdate(
    id,
    { title, artist, content },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: Context) {
  const { params } = context;
  const { id } = params;

  await connectDB();
  await Lyrics.findByIdAndDelete(id);

  return NextResponse.json({ message: 'Deleted' });
}
