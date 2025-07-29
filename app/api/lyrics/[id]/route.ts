import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'
import { NextResponse } from 'next/server'

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: RouteParams) {
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

export async function DELETE(req: Request, { params }: RouteParams) {
  const { id } = params;
  await connectDB();

  await Lyrics.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted' });
}
