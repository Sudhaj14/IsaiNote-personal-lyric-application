'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!res?.error) router.push("/")
    else alert("Invalid credentials")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mt-10 space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Sign In</button>
    </form>
  )
}
