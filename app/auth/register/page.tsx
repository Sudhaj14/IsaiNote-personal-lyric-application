'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    })  

    if (res.ok) router.push("/auth/signin")
    else alert("Failed to register")
  }

  return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mt-10 space-y-4 bg-black/60 text-white shadow rounded">
      <h2 className="text-xl font-semibold">Register</h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  )
}
