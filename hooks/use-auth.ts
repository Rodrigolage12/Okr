"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export interface AuthUser {
  id: string
  name: string
  email: string | null
  username?: string
  type: "admin" | "client"
  companyId?: string
}

// Mock auth state for development
const getMockUser = () => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("mockUser")
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch (e) {
        console.error("Error parsing saved user:", e)
      }
    }
  }
  return null
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        setError(null)

        // Check if we're in browser environment
        if (typeof window === "undefined") {
          if (mounted) {
            setLoading(false)
          }
          return
        }

        console.log("Initializing auth...")

        // Check for mock user in localStorage
        const mockUser = getMockUser()

        if (mockUser && mounted) {
          console.log("Found mock user:", mockUser.email)

          const authUser: AuthUser = {
            id: mockUser.id,
            name: mockUser.name || mockUser.user_metadata?.name || "Usuário",
            email: mockUser.email,
            username: mockUser.username || mockUser.user_metadata?.username,
            type: mockUser.type || mockUser.user_metadata?.type || "client",
            companyId: mockUser.companyId,
          }

          setUser(authUser)
          setIsAuth(true)
          setLoading(false)
        } else {
          console.log("No user found, redirecting to login")
          if (mounted) {
            setLoading(false)

            // Only redirect if we're not already on the login page
            if (typeof window !== "undefined" && window.location.pathname !== "/") {
              router.push("/")
            }
          }
        }
      } catch (error: any) {
        console.error("Error initializing auth:", error)
        if (mounted) {
          setError(error.message || "Erro ao inicializar autenticação")
          setLoading(false)
        }
      }
    }

    initAuth()

    return () => {
      mounted = false
    }
  }, [router])

  const handleLogout = async () => {
    try {
      setError(null)
      setLoading(true)

      // Clear mock user
      if (typeof window !== "undefined") {
        localStorage.removeItem("mockUser")
      }

      setUser(null)
      setIsAuth(false)

      console.log("User logged out successfully")
      router.push("/")
    } catch (error: any) {
      console.error("Error logging out:", error)
      setError(error.message || "Erro ao fazer logout")
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    isAuthenticated: isAuth,
    error,
    logout: handleLogout,
  }
}
