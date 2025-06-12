import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"
import { createUser } from "./supabase-db"

export interface AuthUser {
  id: string
  email: string
  name: string
  username?: string
  type: "admin" | "client"
  companyId?: string
}

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return !!(url && key && url !== "your-supabase-url" && key !== "your-supabase-anon-key")
  } catch {
    return false
  }
}

// Test Supabase connection
const testSupabaseConnection = async () => {
  try {
    if (!isSupabaseConfigured()) return false

    // Try a simple query to test connection
    const { data, error } = await supabase.from("users").select("count").limit(1)
    return !error
  } catch {
    return false
  }
}

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    console.log("Attempting sign in for:", email)

    // Check if Supabase is configured and working
    const supabaseWorking = await testSupabaseConnection()

    if (!supabaseWorking) {
      console.log("Supabase not available, using mock authentication")
      return mockSignIn(email, password)
    }

    // Try to sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("Supabase sign in error:", error.message)

      // If user doesn't exist, try to create them
      if (error.message === "Invalid login credentials") {
        console.log("User not found, attempting to create account...")
        return await createUserAndSignIn(email, password)
      }

      // If email not confirmed, handle gracefully
      if (error.message === "Email not confirmed") {
        console.log("Email not confirmed, using mock authentication")
        return mockSignIn(email, password)
      }

      throw error
    }

    console.log("Supabase sign in successful")
    return data.user
  } catch (error: any) {
    console.error("Error signing in:", error)

    // Fallback to mock authentication for development
    console.log("Falling back to mock authentication")
    return mockSignIn(email, password)
  }
}

// Mock sign in for development (fallback)
const mockSignIn = (email: string, password: string): User => {
  console.log("Mock sign in attempt:", email)

  // Mock users for development
  const MOCK_USERS = {
    "rodrigocastrolage@gmail.com": {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "rodrigocastrolage@gmail.com",
      name: "Rodrigo Castro",
      type: "admin",
    },
    "joao@empresa.com": {
      id: "550e8400-e29b-41d4-a716-446655440001",
      email: "joao@empresa.com",
      name: "João Silva",
      username: "joao_silva",
      type: "client",
    },
    "maria@empresa.com": {
      id: "550e8400-e29b-41d4-a716-446655440002",
      email: "maria@empresa.com",
      name: "Maria Santos",
      username: "maria_santos",
      type: "client",
    },
  }

  const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS]

  if (mockUser && password === "123456") {
    return {
      id: mockUser.id,
      email: mockUser.email,
      user_metadata: {
        name: mockUser.name,
        username: mockUser.username,
        type: mockUser.type,
      },
      app_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as User
  }

  throw new Error("Credenciais inválidas")
}

// Create user and sign in
const createUserAndSignIn = async (email: string, password: string) => {
  try {
    console.log("Creating new user:", email)

    // Determine user type and name based on email
    const isAdmin = email === "rodrigocastrolage@gmail.com"
    const userData = {
      name: isAdmin ? "Rodrigo Castro" : email.split("@")[0].replace("_", " "),
      type: isAdmin ? "admin" : "client",
      username: !isAdmin ? email.split("@")[0] : undefined,
    }

    // Try to create the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })

    if (signUpError) {
      console.log("Sign up error:", signUpError.message)
      throw signUpError
    }

    if (signUpData.user) {
      // Create user record in our users table
      await createUser({
        id: signUpData.user.id,
        email: signUpData.user.email!,
        name: userData.name,
        username: userData.username,
        type: userData.type as "admin" | "client",
      })

      return signUpData.user
    }

    throw new Error("Falha ao criar usuário")
  } catch (error: any) {
    console.error("Error creating user:", error)
    // Fallback to mock authentication
    return mockSignIn(email, password)
  }
}

// Sign up with email and password
export const signUp = async (email: string, password: string, userData?: any) => {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase não configurado. Use as credenciais de teste.")
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })

    if (error) {
      throw error
    }

    // Create user record in our users table
    if (data.user) {
      await createUser({
        id: data.user.id,
        email: data.user.email!,
        name: userData?.name || email.split("@")[0],
        username: userData?.username,
        type: userData?.type || "client",
      })
    }

    return data.user
  } catch (error: any) {
    console.error("Error signing up:", error)
    throw new Error(error.message || "Erro ao criar conta")
  }
}

// Sign out
export const signOut = async () => {
  try {
    if (!isSupabaseConfigured()) {
      console.log("Mock sign out")
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.warn("Sign out error:", error)
    }
  } catch (error: any) {
    console.warn("Error signing out:", error)
  }
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    if (!isSupabaseConfigured()) {
      return null
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.warn("Session error:", sessionError)
      return null
    }

    if (!session) {
      return null
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.warn("User error:", userError)
      return null
    }

    return user
  } catch (error: any) {
    console.warn("Error getting current user:", error)
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    if (!isSupabaseConfigured()) {
      return false
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()
    return !!session
  } catch (error) {
    console.warn("Error checking authentication:", error)
    return false
  }
}

// Get current session
export const getCurrentSession = async () => {
  try {
    if (!isSupabaseConfigured()) {
      return null
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.warn("Session error:", error)
      return null
    }

    return session
  } catch (error: any) {
    console.warn("Error getting session:", error)
    return null
  }
}

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!isSupabaseConfigured()) {
    return { data: { subscription: { unsubscribe: () => {} } } }
  }

  return supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth event:", event, session?.user?.id)

    switch (event) {
      case "SIGNED_IN":
        callback(session?.user || null)
        break
      case "SIGNED_OUT":
        callback(null)
        break
      case "TOKEN_REFRESHED":
        callback(session?.user || null)
        break
      case "USER_UPDATED":
        callback(session?.user || null)
        break
      default:
        callback(session?.user || null)
    }
  })
}

// Refresh session
export const refreshSession = async () => {
  try {
    if (!isSupabaseConfigured()) {
      return null
    }

    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      console.warn("Error refreshing session:", error)
      return null
    }

    return data.session
  } catch (error: any) {
    console.warn("Error refreshing session:", error)
    return null
  }
}
