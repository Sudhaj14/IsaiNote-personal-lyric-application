// models/Lyrics.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface ILyric extends Document {
  title: string
  artist: string
  content: string
  userId: string
  image?: string // Add this
}


const LyricsSchema = new Schema<ILyric>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
  image: { type: String }, // Add this line
}, {
  timestamps: true
})


export default mongoose.models.Lyrics || mongoose.model<ILyric>('Lyrics', LyricsSchema)
