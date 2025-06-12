import { supabase } from "./supabase"
import type { User, Client, OKR, Report, Task, Meeting } from "./supabase"

// Helper function to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = supabase.supabaseUrl
  const key = supabase.supabaseKey
  return url && key && !url.includes("your-project") && !key.includes("your-anon-key")
}

// User operations
export const getUser = async (id: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

export const createUser = async (userData: Partial<User>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase.from("users").insert([userData]).select().single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export const updateUser = async (id: string, userData: Partial<User>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ ...userData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

// Client operations
export const getClients = async () => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase.from("clients").select("*").order("name")

    if (error) {
      console.error("Supabase error getting clients:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error getting clients:", error)
    throw error
  }
}

export const createClient = async (clientData: Partial<Client>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    // Ensure all required fields are present
    const requiredFields = ["name", "email", "username", "password", "company"]
    for (const field of requiredFields) {
      if (!clientData[field as keyof Client]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          name: clientData.name,
          email: clientData.email,
          username: clientData.username,
          password: clientData.password,
          company: clientData.company,
          phone: clientData.phone || null,
          address: clientData.address || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error creating client:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating client:", error)
    throw error
  }
}

export const updateClient = async (id: string, clientData: Partial<Client>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase
      .from("clients")
      .update({ ...clientData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating client:", error)
    throw error
  }
}

export const deleteClient = async (id: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { error } = await supabase.from("clients").delete().eq("id", id)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting client:", error)
    throw error
  }
}

// OKR operations
export const getOKRs = async (clientId?: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    let query = supabase
      .from("okrs")
      .select(`
        *,
        key_results (*)
      `)
      .order("created_at", { ascending: false })

    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error getting OKRs:", error)
    throw error
  }
}

export const createOKR = async (okrData: Partial<OKR>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase.from("okrs").insert([okrData]).select().single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating OKR:", error)
    throw error
  }
}

export const updateOKR = async (id: string, okrData: Partial<OKR>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase
      .from("okrs")
      .update({ ...okrData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating OKR:", error)
    throw error
  }
}

export const deleteOKR = async (id: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { error } = await supabase.from("okrs").delete().eq("id", id)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting OKR:", error)
    throw error
  }
}

// Report operations
export const getReports = async (clientId?: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    let query = supabase.from("reports").select("*").order("created_at", { ascending: false })

    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error getting reports:", error)
    throw error
  }
}

export const createReport = async (reportData: Partial<Report>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase.from("reports").insert([reportData]).select().single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating report:", error)
    throw error
  }
}

export const updateReport = async (id: string, reportData: Partial<Report>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase
      .from("reports")
      .update({ ...reportData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating report:", error)
    throw error
  }
}

export const deleteReport = async (id: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { error } = await supabase.from("reports").delete().eq("id", id)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting report:", error)
    throw error
  }
}

// Task operations
export const getTasks = async (clientId?: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    let query = supabase.from("tasks").select("*").order("created_at", { ascending: false })

    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error getting tasks:", error)
    throw error
  }
}

export const createTask = async (taskData: Partial<Task>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase.from("tasks").insert([taskData]).select().single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

export const updateTask = async (id: string, taskData: Partial<Task>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase
      .from("tasks")
      .update({ ...taskData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating task:", error)
    throw error
  }
}

export const deleteTask = async (id: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { error } = await supabase.from("tasks").delete().eq("id", id)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}

// Meeting operations
export const getMeetings = async (clientId?: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    let query = supabase.from("meetings").select("*").order("date", { ascending: true })

    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error getting meetings:", error)
    throw error
  }
}

export const createMeeting = async (meetingData: Partial<Meeting>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase.from("meetings").insert([meetingData]).select().single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating meeting:", error)
    throw error
  }
}

export const updateMeeting = async (id: string, meetingData: Partial<Meeting>) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { data, error } = await supabase
      .from("meetings")
      .update({ ...meetingData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating meeting:", error)
    throw error
  }
}

export const deleteMeeting = async (id: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase not configured")
  }

  try {
    const { error } = await supabase.from("meetings").delete().eq("id", id)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error("Error deleting meeting:", error)
    throw error
  }
}
