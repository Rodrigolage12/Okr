import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

export interface AuthUser {
  id: string
  email: string
  name: string
  username?: string
  type: "admin" | "client"
  companyId?: string
}

// Mock user data for development
const MOCK_USERS = {
  "rodrigocastrolage@gmail.com": {
    id: "mock-admin-1",
    email: "rodrigocastrolage@gmail.com",
    name: "Rodrigo Castro",
    type: "admin" as const,
  },
  "cliente_teste@client.local": {
    id: "mock-client-1",
    email: "cliente_teste@client.local",
    name: "Cliente Teste",
    username: "cliente_teste",
    type: "client" as const,
  },
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

    // Always try mock authentication first for development
    if (email === "rodrigocastrolage@gmail.com" || email.includes("@client.local")) {
      console.log("Using mock authentication for development")
      return mockSignIn(email, password)
    }

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

    // Always fallback to mock authentication for development
    console.log("Falling back to mock authentication")
    return mockSignIn(email, password)
  }
}

// Mock sign in for development
const mockSignIn = (email: string, password: string): User => {
  console.log("Mock sign in attempt:", email)

  // Handle client emails
  if (email.includes("@client.local")) {
    const username = email.split("@")[0]
    if (password === "123456") {
      return {
        id: `mock-client-${username}`,
        email: email,
        user_metadata: {
          name: username.replace("_", " "),
          username: username,
          type: "client",
        },
        app_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as User
    }
  }

  // Handle predefined mock users
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

  throw new Error("Credenciais inválidas para modo de desenvolvimento")
}

// Create user and sign in (with email confirmation disabled)
const createUserAndSignIn = async (email: string, password: string) => {
  try {
    console.log("Creating new user:", email)

    // Determine user type and name based on email
    const isAdmin = email === "rodrigocastrolage@gmail.com" || email.includes("admin")
    const isClient = email.includes("@client.local")

    const userData = {
      name: isAdmin ? "Rodrigo Castro" : isClient ? email.split("@")[0].replace("_", " ") : email.split("@")[0],
      type: isAdmin ? "admin" : "client",
      username: isClient ? email.split("@")[0] : undefined,
    }

    // Try to create the user with email confirmation disabled
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: undefined, // Disable email confirmation
      },
    })

    if (signUpError) {
      console.log("Sign up error:", signUpError.message)

      // If email confirmation is required, fallback to mock
      if (signUpError.message.includes("Email not confirmed") || signUpError.message.includes("confirmation")) {
        console.log("Email confirmation required, using mock authentication")
        return mockSignIn(email, password)
      }

      throw signUpError
    }

    // If user was created successfully, try to sign in
    if (signUpData.user) {
      console.log("User created, attempting sign in")

      // Wait a moment for the user to be fully created
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.log("Sign in after creation failed:", signInError.message)
        // Fallback to mock if sign in fails
        return mockSignIn(email, password)
      }

      return signInData.user
    }

    throw new Error("Falha ao criar usuário")
  } catch (error: any) {
    console.error("Error creating user:", error)
    // Always fallback to mock authentication
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
        emailRedirectTo: undefined, // Disable email confirmation for development
      },
    })

    if (error) {
      throw error
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
      // Mock sign out
      console.log("Mock sign out")
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.warn("Sign out error:", error)
      // Don't throw error for sign out
    }
  } catch (error: any) {
    console.warn("Error signing out:", error)
    // Don't throw error for sign out
  }
}

// Get current user - with proper session handling
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    if (!isSupabaseConfigured()) {
      // Return null for mock mode - auth state will be handled by the auth hook
      return null
    }

    // First try to get the session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.warn("Session error:", sessionError)
      return null
    }

    // If no session, return null (not an error)
    if (!session) {
      return null
    }

    // If session exists, get user data
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
    // For mock mode, we'll handle this in the auth hook
    return { data: { subscription: { unsubscribe: () => {} } } }
  }

  return supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth event:", event, session?.user?.id)

    // Handle different auth events
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
