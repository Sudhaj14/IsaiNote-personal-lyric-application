import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectDB();

  try {
    const lyric = await Lyrics.findById(id);
    if (!lyric) {
      return NextResponse.json({ message: 'Lyric not found' }, { status: 404 });
    }

    return NextResponse.json(lyric);
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving lyric' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const { title, artist, content } = await req.json();
  await connectDB();

  const updated = await Lyrics.findByIdAndUpdate(
    id,
    { title, artist, content },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectDB();
  await Lyrics.findByIdAndDelete(id);

  return NextResponse.json({ message: 'Deleted' });
}
