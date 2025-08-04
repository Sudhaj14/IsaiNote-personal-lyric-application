'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (res.ok) {
      toast.success("Registration successful!")
      setTimeout(() => router.push("/auth/signin"), 2000)
    } else {
      toast.error(data.message || "Failed to register")
    }
  }

  return (
    <>
      <form
  onSubmit={handleSubmit}
  className="group max-w-md mx-auto mt-20 bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg space-y-4 border border-transparent hover:border-green-400 transition-all duration-500 ease-in-out"
>
  <h2 className="text-3xl font-bold text-center mb-4 transition duration-300 group-hover:text-green-400">
    Register
  </h2>

  <input
    type="text"
    placeholder="Name"
    className="w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    required
  />
  <input
    type="email"
    placeholder="Email"
    className="w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
    onChange={(e) => setForm({ ...form, email: e.target.value })}
    required
  />
  <input
    type="password"
    placeholder="Password"
    className="w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
    onChange={(e) => setForm({ ...form, password: e.target.value })}
    required
  />

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-lg font-semibold transition duration-300"
  >
    Register
  </button>
</form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  )
}
