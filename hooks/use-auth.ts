"use client"

import { useState, useEffect } from "react"
import { signIn, signOut as authSignOut, getCurrentUser } from "@/lib/supabase-auth"

interface User {
  id: string
  email: string
  name: string
  type: "admin" | "client"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error("Error checking user:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const user = await signIn(email, password)
      setUser(user)
      return user
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await authSignOut()
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return {
    user,
    loading,
    login,
    signOut,
  }
}
