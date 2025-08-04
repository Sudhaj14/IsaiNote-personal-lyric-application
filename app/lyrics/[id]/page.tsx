import { connectDB } from '@/lib/mongodb'
import Lyrics from '@/models/Lyrics'

export default async function LyricDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const lyric = await Lyrics.findById(id);

  if (!lyric) {
    return <p className="text-center mt-10 text-red-400 text-lg">🎵 Lyric not found.</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6 py-8 bg-gradient-to-br from-black via-zinc-900 to-red-950 rounded-2xl shadow-lg shadow-red-900/30 border border-red-700">
      <h1 className="text-3xl font-extrabold text-red-500 mb-2 tracking-wide">
        {lyric.title}
      </h1>
      <h2 className="text-xl text-white/80 mb-6 italic">
        — {lyric.artist}
      </h2>
      <pre className="whitespace-pre-wrap text-white text-lg leading-relaxed font-mono bg-black/30 p-4 rounded-lg  shadow-inner">
        {lyric.content}
      </pre>
    </div>
  );
}
