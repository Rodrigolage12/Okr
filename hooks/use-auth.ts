"use client"

import { useState, useEffect } from "react"

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
    try {
      const savedUser = localStorage.getItem("mockUser")
      if (savedUser) {
        const parsed = JSON.parse(savedUser)
        console.log("Found saved user:", parsed.email, parsed.type)
        return parsed
      }
    } catch (e) {
      console.error("Error parsing saved user:", e)
      // Clear corrupted data
      localStorage.removeItem("mockUser")
    }
  }
  return null
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

        // Small delay to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Check for mock user in localStorage
        const mockUser = getMockUser()

        if (mockUser && mounted) {
          console.log("Restoring user session:", mockUser.email)

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
          console.log("User session restored successfully")
        } else {
          console.log("No user session found")
        }

        if (mounted) {
          setLoading(false)
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
  }, [])

  const handleLogout = async () => {
    try {
      setError(null)
      console.log("Starting logout process...")

      // Clear mock user from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("mockUser")
        console.log("Cleared localStorage")
      }

      // Reset auth state
      setUser(null)
      setIsAuth(false)

      console.log("User logged out successfully")

      // Small delay before redirect to ensure state is updated
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "/"
        }
      }, 100)
    } catch (error: any) {
      console.error("Error logging out:", error)
      setError(error.message || "Erro ao fazer logout")
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
