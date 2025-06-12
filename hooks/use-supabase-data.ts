"use client"

import { useState, useEffect } from "react"
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getOKRs,
  createOKR,
  updateOKR,
  deleteOKR,
  getReports,
  createReport,
  updateReport,
  deleteReport,
} from "@/lib/supabase-db"
import type { Client, OKR, Report } from "@/lib/supabase"

// Clients hook
export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)
      const clientsData = await getClients()
      setClients(clientsData)
    } catch (error: any) {
      setError(error.message || "Erro ao carregar clientes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const addClient = async (clientData: Partial<Client>) => {
    try {
      const newClient = await createClient(clientData)
      setClients((prev) => [newClient, ...prev])
      return newClient
    } catch (error: any) {
      setError(error.message || "Erro ao criar cliente")
      throw error
    }
  }

  const editClient = async (clientId: string, clientData: Partial<Client>) => {
    try {
      const updatedClient = await updateClient(clientId, clientData)
      setClients((prev) => prev.map((client) => (client.id === clientId ? updatedClient : client)))
      return updatedClient
    } catch (error: any) {
      setError(error.message || "Erro ao atualizar cliente")
      throw error
    }
  }

  const removeClient = async (clientId: string) => {
    try {
      await deleteClient(clientId)
      setClients((prev) => prev.filter((client) => client.id !== clientId))
    } catch (error: any) {
      setError(error.message || "Erro ao excluir cliente")
      throw error
    }
  }

  return {
    clients,
    loading,
    error,
    addClient,
    editClient,
    removeClient,
    refetch: fetchClients,
  }
}

// OKRs hook
export function useOKRs(clientId?: string) {
  const [okrs, setOKRs] = useState<OKR[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOKRs = async () => {
    try {
      setLoading(true)
      setError(null)
      const okrsData = await getOKRs(clientId)
      setOKRs(okrsData)
    } catch (error: any) {
      setError(error.message || "Erro ao carregar OKRs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOKRs()
  }, [clientId])

  const addOKR = async (okrData: Partial<OKR>) => {
    try {
      const newOKR = await createOKR(okrData)
      setOKRs((prev) => [newOKR, ...prev])
      return newOKR
    } catch (error: any) {
      setError(error.message || "Erro ao criar OKR")
      throw error
    }
  }

  const editOKR = async (okrId: string, okrData: Partial<OKR>) => {
    try {
      const updatedOKR = await updateOKR(okrId, okrData)
      setOKRs((prev) => prev.map((okr) => (okr.id === okrId ? updatedOKR : okr)))
      return updatedOKR
    } catch (error: any) {
      setError(error.message || "Erro ao atualizar OKR")
      throw error
    }
  }

  const removeOKR = async (okrId: string) => {
    try {
      await deleteOKR(okrId)
      setOKRs((prev) => prev.filter((okr) => okr.id !== okrId))
    } catch (error: any) {
      setError(error.message || "Erro ao excluir OKR")
      throw error
    }
  }

  return {
    okrs,
    loading,
    error,
    addOKR,
    editOKR,
    removeOKR,
    refetch: fetchOKRs,
  }
}

// Reports hook
export function useReports(clientId?: string) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)
      const reportsData = await getReports(clientId)
      setReports(reportsData)
    } catch (error: any) {
      setError(error.message || "Erro ao carregar relatórios")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [clientId])

  const addReport = async (reportData: Partial<Report>) => {
    try {
      const newReport = await createReport(reportData)
      setReports((prev) => [newReport, ...prev])
      return newReport
    } catch (error: any) {
      setError(error.message || "Erro ao criar relatório")
      throw error
    }
  }

  const editReport = async (reportId: string, reportData: Partial<Report>) => {
    try {
      const updatedReport = await updateReport(reportId, reportData)
      setReports((prev) => prev.map((report) => (report.id === reportId ? updatedReport : report)))
      return updatedReport
    } catch (error: any) {
      setError(error.message || "Erro ao atualizar relatório")
      throw error
    }
  }

  const removeReport = async (reportId: string) => {
    try {
      await deleteReport(reportId)
      setReports((prev) => prev.filter((report) => report.id !== reportId))
    } catch (error: any) {
      setError(error.message || "Erro ao excluir relatório")
      throw error
    }
  }

  return {
    reports,
    loading,
    error,
    addReport,
    editReport,
    removeReport,
    refetch: fetchReports,
  }
}
