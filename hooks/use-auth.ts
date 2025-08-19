"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export interface User {
  id: string
  email: string
  name: string
  user_type: "admin" | "client"
  client_id?: string
}

// Mock users for fallback
const mockUsers: User[] = [
  {
    id: "1",
    email: "rodrigocastrolage@gmail.com",
    name: "Rodrigo Castro",
    user_type: "admin",
  },
  {
    id: "2",
    email: "joao@empresa.com",
    name: "João Silva",
    user_type: "client",
    client_id: "1",
  },
  {
    id: "3",
    email: "maria@empresa.com",
    name: "Maria Santos",
    user_type: "client",
    client_id: "2",
  },
]

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Try Supabase first
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Get user profile from database
          const { data: profile } = await supabase.from("users").select("*").eq("email", session.user.email).single()

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.name,
              user_type: profile.user_type,
              client_id: profile.client_id,
            })
          }
        } else {
          // Fallback to localStorage
          const savedUser = localStorage.getItem("okr_user")
          if (savedUser) {
            setUser(JSON.parse(savedUser))
          }
        }
      } catch (error) {
        console.log("Supabase not available, using mock data")
        // Fallback to localStorage
        const savedUser = localStorage.getItem("okr_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data: profile } = await supabase.from("users").select("*").eq("email", session.user.email).single()

        if (profile) {
          const userData = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            user_type: profile.user_type,
            client_id: profile.client_id,
          }
          setUser(userData)
          localStorage.setItem("okr_user", JSON.stringify(userData))
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        localStorage.removeItem("okr_user")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Try Supabase authentication first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const { data: profile } = await supabase.from("users").select("*").eq("email", data.user.email).single()

        if (profile) {
          const userData = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            user_type: profile.user_type,
            client_id: profile.client_id,
          }
          setUser(userData)
          localStorage.setItem("okr_user", JSON.stringify(userData))
          return { success: true }
        }
      }
    } catch (error) {
      console.log("Supabase login failed, trying mock authentication")

      // Fallback to mock authentication
      const mockUser = mockUsers.find((u) => u.email === email)
      if (mockUser && password === "123456") {
        setUser(mockUser)
        localStorage.setItem("okr_user", JSON.stringify(mockUser))
        return { success: true }
      }

      return { success: false, error: "Invalid credentials" }
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.log("Supabase logout failed")
    }

    setUser(null)
    localStorage.removeItem("okr_user")
  }

  return {
    user,
    loading,
    login,
    logout,
  }
}
