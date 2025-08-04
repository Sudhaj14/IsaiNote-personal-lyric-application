import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    await connectDB()

    const userExists = await User.findOne({ email })
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: "User registered", user: newUser }, { status: 200 })
  } catch (error) {
    console.error("Register Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
