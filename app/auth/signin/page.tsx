'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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

    if (!res?.error) {
      toast.success("Signed in successfully!")
      setTimeout(() => router.push("/"), 2000)
    } else {
      if (res.error === "No user found") {
        toast.error("No user found with this email.")
      } else if (res.error === "Incorrect password") {
        toast.error("Incorrect password.")
      } else {
        toast.error("Sign-in failed.")
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="group max-w-md mx-auto mt-20 bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg space-y-4 border border-transparent hover:border-green-400 transition-all duration-500 ease-in-out"
      >
        <h2 className="text-3xl font-bold text-center mb-4 transition duration-300 group-hover:text-green-400">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          Sign In
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  )
}
