import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Database types
export interface User {
  id: string
  email: string
  name: string
  username?: string
  type: "admin" | "client"
  company_id?: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  name: string
  email: string
  username: string
  password: string
  company: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface OKR {
  id: string
  client_id: string
  title: string
  description?: string
  quarter: string
  year: number
  status: "draft" | "active" | "completed" | "cancelled"
  key_results: KeyResult[]
  created_at: string
  updated_at: string
}

export interface KeyResult {
  id: string
  okr_id: string
  title: string
  description?: string
  target_value: number
  current_value: number
  unit: string
  status: "not_started" | "in_progress" | "completed"
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  client_id: string
  title: string
  content: string
  type: "monthly" | "quarterly" | "annual" | "custom"
  status: "draft" | "sent" | "viewed"
  sent_at?: string
  viewed_at?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  client_id?: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  due_date?: string
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Meeting {
  id: string
  client_id?: string
  title: string
  description?: string
  date: string
  duration: number
  type: "consultation" | "follow_up" | "review" | "planning"
  status: "scheduled" | "completed" | "cancelled"
  participants?: string[]
  created_at: string
  updated_at: string
}
