import { supabase } from "./supabase"

// Mock users for fallback
const MOCK_USERS = {
  "rodrigocastrolage@gmail.com": {
    id: "admin-1",
    email: "rodrigocastrolage@gmail.com",
    name: "Rodrigo Castro",
    type: "admin" as const,
    password: "123456",
  },
  "joao@empresa.com": {
    id: "client-1",
    email: "joao@empresa.com",
    name: "João Silva",
    type: "client" as const,
    password: "123456",
  },
  "maria@empresa.com": {
    id: "client-2",
    email: "maria@empresa.com",
    name: "Maria Santos",
    type: "client" as const,
    password: "123456",
  },
}

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = supabase.supabaseUrl
  const key = supabase.supabaseKey
  return url && key && !url.includes("your-project") && !key.includes("your-anon-key")
}

// Store current user in localStorage for persistence
const STORAGE_KEY = "okr_current_user"

export const signIn = async (email: string, password: string) => {
  if (isSupabaseConfigured()) {
    try {
      // Try Supabase authentication first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Get user profile from users table
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single()

        if (profileError) {
          // If no profile exists, create one
          const newProfile = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.email?.split("@")[0] || "User",
            type: email === "rodrigocastrolage@gmail.com" ? "admin" : "client",
          }

          const { data: createdProfile, error: createError } = await supabase
            .from("users")
            .insert([newProfile])
            .select()
            .single()

          if (createError) throw createError

          const user = {
            id: createdProfile.id,
            email: createdProfile.email,
            name: createdProfile.name,
            type: createdProfile.type,
          }

          localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
          return user
        }

        const user = {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          type: profile.type,
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
      }
    } catch (error) {
      console.error("Supabase auth error:", error)
      // Fall through to mock authentication
    }
  }

  // Mock authentication fallback
  const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS]
  if (mockUser && mockUser.password === password) {
    const user = {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      type: mockUser.type,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  }

  throw new Error("Credenciais inválidas")
}

export const signOut = async () => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Supabase sign out error:", error)
    }
  }
  localStorage.removeItem(STORAGE_KEY)
}

export const getCurrentUser = async () => {
  // Check localStorage first
  const storedUser = localStorage.getItem(STORAGE_KEY)
  if (storedUser) {
    try {
      return JSON.parse(storedUser)
    } catch (error) {
      console.error("Error parsing stored user:", error)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  if (isSupabaseConfigured()) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

        if (profile) {
          const userData = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            type: profile.type,
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
          return userData
        }
      }
    } catch (error) {
      console.error("Error getting current user:", error)
    }
  }

  return null
}
