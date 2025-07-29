import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'

export default async function LyricDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const lyric = await Lyrics.findById(id);

  if (!lyric) {
    return <p className="text-center mt-10">Lyric not found.</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{lyric.title}</h1>
      <h2 className="text-lg text-gray-600 mb-4">by {lyric.artist}</h2>
      <pre className="whitespace-pre-wrap text-gray-800">{lyric.content}</pre>
    </div>
  );
}
