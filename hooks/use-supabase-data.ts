"use client"

import { useState, useEffect } from "react"
import {
  getClients,
  createClient,
  deleteClient,
  getOKRs,
  createOKR,
  deleteOKR,
  getReports,
  createReport,
  deleteReport,
  getTasks,
  createTask,
  deleteTask,
} from "@/lib/supabase-db"

// Clients hook
export function useClients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      setLoading(true)
      const data = await getClients()
      setClients(data)
      setError(null)
    } catch (err) {
      console.error("Error loading clients:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setClients([])
    } finally {
      setLoading(false)
    }
  }

  const addClient = async (clientData: any) => {
    try {
      const newClient = await createClient(clientData)
      setClients([newClient, ...clients])
      return newClient
    } catch (err) {
      console.error("Error adding client:", err)
      throw err
    }
  }

  const removeClient = async (id: string) => {
    try {
      await deleteClient(id)
      setClients(clients.filter((client) => client.id !== id))
    } catch (err) {
      console.error("Error removing client:", err)
      throw err
    }
  }

  return {
    clients,
    loading,
    error,
    addClient,
    removeClient,
    reload: loadClients,
  }
}

// OKRs hook
export function useOKRs(clientId?: string) {
  const [okrs, setOKRs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadOKRs()
  }, [clientId])

  const loadOKRs = async () => {
    try {
      setLoading(true)
      const data = await getOKRs(clientId)
      setOKRs(data)
      setError(null)
    } catch (err) {
      console.error("Error loading OKRs:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setOKRs([])
    } finally {
      setLoading(false)
    }
  }

  const addOKR = async (okrData: any) => {
    try {
      const newOKR = await createOKR(okrData)
      setOKRs([newOKR, ...okrs])
      return newOKR
    } catch (err) {
      console.error("Error adding OKR:", err)
      throw err
    }
  }

  const removeOKR = async (id: string) => {
    try {
      await deleteOKR(id)
      setOKRs(okrs.filter((okr) => okr.id !== id))
    } catch (err) {
      console.error("Error removing OKR:", err)
      throw err
    }
  }

  return {
    okrs,
    loading,
    error,
    addOKR,
    removeOKR,
    reload: loadOKRs,
  }
}

// Reports hook
export function useReports(clientId?: string) {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadReports()
  }, [clientId])

  const loadReports = async () => {
    try {
      setLoading(true)
      const data = await getReports(clientId)
      setReports(data)
      setError(null)
    } catch (err) {
      console.error("Error loading reports:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  const addReport = async (reportData: any) => {
    try {
      const newReport = await createReport(reportData)
      setReports([newReport, ...reports])
      return newReport
    } catch (err) {
      console.error("Error adding report:", err)
      throw err
    }
  }

  const removeReport = async (id: string) => {
    try {
      await deleteReport(id)
      setReports(reports.filter((report) => report.id !== id))
    } catch (err) {
      console.error("Error removing report:", err)
      throw err
    }
  }

  return {
    reports,
    loading,
    error,
    addReport,
    removeReport,
    reload: loadReports,
  }
}

// Tasks hook
export function useTasks(clientId?: string) {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  }, [clientId])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks(clientId)
      setTasks(data)
      setError(null)
    } catch (err) {
      console.error("Error loading tasks:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData: any) => {
    try {
      const newTask = await createTask(taskData)
      setTasks([newTask, ...tasks])
      return newTask
    } catch (err) {
      console.error("Error adding task:", err)
      throw err
    }
  }

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (err) {
      console.error("Error removing task:", err)
      throw err
    }
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    removeTask,
    reload: loadTasks,
  }
}
