"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./use-auth"

export interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  due_date?: string
  assigned_to?: string
  client_id?: string
  created_at: string
  updated_at: string
}

export interface OKR {
  id: string
  title: string
  description?: string
  objective: string
  key_results: string[]
  progress: number
  status: "draft" | "active" | "completed" | "cancelled"
  client_id?: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  status: "active" | "inactive"
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  type: "meeting" | "deadline" | "review"
  client_id?: string
  created_at: string
  updated_at: string
}

// Mock data for fallback
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Revisar relatório mensal",
    description: "Analisar métricas do mês anterior",
    status: "pending",
    priority: "high",
    due_date: "2024-01-15",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Preparar apresentação",
    description: "Slides para reunião com cliente",
    status: "in_progress",
    priority: "medium",
    due_date: "2024-01-20",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

const mockOKRs: OKR[] = [
  {
    id: "1",
    title: "Aumentar vendas Q1",
    description: "Objetivo de crescimento para o primeiro trimestre",
    objective: "Aumentar receita em 25%",
    key_results: ["Fechar 50 novos contratos", "Aumentar ticket médio em 15%", "Reduzir churn em 10%"],
    progress: 65,
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@empresa.com",
    company: "Empresa ABC",
    phone: "(11) 99999-9999",
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@empresa.com",
    company: "Empresa XYZ",
    phone: "(11) 88888-8888",
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Reunião de planejamento",
    description: "Definir metas do próximo mês",
    date: "2024-01-15",
    time: "14:00",
    type: "meeting",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchTasks()
  }, [user])

  const fetchTasks = async () => {
    try {
      let query = supabase.from("tasks").select("*")

      if (user?.user_type === "client" && user.client_id) {
        query = query.eq("client_id", user.client_id)
      }

      const { data, error } = await query

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.log("Using mock tasks data")
      setTasks(mockTasks)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (task: Omit<Task, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("tasks").insert([task]).select().single()

      if (error) throw error
      setTasks((prev) => [...prev, data])
      return { success: true }
    } catch (error) {
      const newTask: Task = {
        ...task,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setTasks((prev) => [...prev, newTask])
      return { success: true }
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase.from("tasks").update(updates).eq("id", id).select().single()

      if (error) throw error
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)))
      return { success: true }
    } catch (error) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates, updated_at: new Date().toISOString() } : task)),
      )
      return { success: true }
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id)

      if (error) throw error
      setTasks((prev) => prev.filter((task) => task.id !== id))
      return { success: true }
    } catch (error) {
      setTasks((prev) => prev.filter((task) => task.id !== id))
      return { success: true }
    }
  }

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  }
}

export function useOKRs() {
  const [okrs, setOKRs] = useState<OKR[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchOKRs()
  }, [user])

  const fetchOKRs = async () => {
    try {
      let query = supabase.from("okrs").select("*")

      if (user?.user_type === "client" && user.client_id) {
        query = query.eq("client_id", user.client_id)
      }

      const { data, error } = await query

      if (error) throw error
      setOKRs(data || [])
    } catch (error) {
      console.log("Using mock OKRs data")
      setOKRs(mockOKRs)
    } finally {
      setLoading(false)
    }
  }

  const addOKR = async (okr: Omit<OKR, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("okrs").insert([okr]).select().single()

      if (error) throw error
      setOKRs((prev) => [...prev, data])
      return { success: true }
    } catch (error) {
      const newOKR: OKR = {
        ...okr,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setOKRs((prev) => [...prev, newOKR])
      return { success: true }
    }
  }

  const updateOKR = async (id: string, updates: Partial<OKR>) => {
    try {
      const { data, error } = await supabase.from("okrs").update(updates).eq("id", id).select().single()

      if (error) throw error
      setOKRs((prev) => prev.map((okr) => (okr.id === id ? data : okr)))
      return { success: true }
    } catch (error) {
      setOKRs((prev) =>
        prev.map((okr) => (okr.id === id ? { ...okr, ...updates, updated_at: new Date().toISOString() } : okr)),
      )
      return { success: true }
    }
  }

  return {
    okrs,
    loading,
    addOKR,
    updateOKR,
    refetch: fetchOKRs,
  }
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase.from("clients").select("*")

      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.log("Using mock clients data")
      setClients(mockClients)
    } finally {
      setLoading(false)
    }
  }

  const addClient = async (client: Omit<Client, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("clients").insert([client]).select().single()

      if (error) throw error
      setClients((prev) => [...prev, data])
      return { success: true }
    } catch (error) {
      const newClient: Client = {
        ...client,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setClients((prev) => [...prev, newClient])
      return { success: true }
    }
  }

  return {
    clients,
    loading,
    addClient,
    refetch: fetchClients,
  }
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchEvents()
  }, [user])

  const fetchEvents = async () => {
    try {
      let query = supabase.from("events").select("*")

      if (user?.user_type === "client" && user.client_id) {
        query = query.eq("client_id", user.client_id)
      }

      const { data, error } = await query

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.log("Using mock events data")
      setEvents(mockEvents)
    } finally {
      setLoading(false)
    }
  }

  const addEvent = async (event: Omit<Event, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("events").insert([event]).select().single()

      if (error) throw error
      setEvents((prev) => [...prev, data])
      return { success: true }
    } catch (error) {
      const newEvent: Event = {
        ...event,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setEvents((prev) => [...prev, newEvent])
      return { success: true }
    }
  }

  return {
    events,
    loading,
    addEvent,
    refetch: fetchEvents,
  }
}
