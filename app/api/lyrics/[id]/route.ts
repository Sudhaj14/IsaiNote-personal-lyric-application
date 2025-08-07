import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, context: Params) {
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

export async function PUT(req: NextRequest, context: Params) {
  const { id } = context.params; // ✅ moved from parameter to function body

  const { title, artist, content } = await req.json();
  await connectDB();

  const updated = await Lyrics.findByIdAndUpdate(
    id,
    { title, artist, content },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: Params) {
  const { id } = context.params; // ✅ moved here too

  await connectDB();
  await Lyrics.findByIdAndDelete(id);

  return NextResponse.json({ message: 'Deleted' });
}
