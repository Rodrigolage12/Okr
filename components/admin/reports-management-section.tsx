"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, FileText, Send, Eye, Edit2, Trash2, Filter, Search, Calendar, User } from "lucide-react"
import { NewReportDialog } from "@/components/admin/new-report-dialog"
import { useReports, useClients } from "@/hooks/use-supabase-data"

interface Report {
  id: string
  title: string
  description: string
  content: string
  clientId: string
  clientName: string
  type: "monthly" | "quarterly" | "project" | "custom"
  status: "draft" | "sent" | "viewed"
  createdAt: string
  sentAt?: string
  viewedAt?: string
  createdBy: string
}

export function ReportsManagementSection() {
  const { reports, loading, error, addReport, editReport, removeReport } = useReports()
  const { clients } = useClients()

  const [showNewReportDialog, setShowNewReportDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = reports?.filter((report) => {
    const matchesClient = selectedClient === "all" || report.clientId === selectedClient
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.clientName.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesClient && matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "viewed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Rascunho"
      case "sent":
        return "Enviado"
      case "viewed":
        return "Visualizado"
      default:
        return "Indefinido"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "monthly":
        return "bg-purple-100 text-purple-800"
      case "quarterly":
        return "bg-orange-100 text-orange-800"
      case "project":
        return "bg-cyan-100 text-cyan-800"
      case "custom":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "monthly":
        return "Mensal"
      case "quarterly":
        return "Trimestral"
      case "project":
        return "Projeto"
      case "custom":
        return "Personalizado"
      default:
        return "Indefinido"
    }
  }

  const handleAddReport = (newReport: Omit<Report, "id">) => {
    addReport(newReport)
  }

  const sendReport = (id: string) => {
    editReport(id, {
      status: "sent" as const,
      sentAt: new Date().toISOString().split("T")[0],
    })
  }

  const deleteReport = (id: string) => {
    removeReport(id)
  }

  const totalReports = reports?.length || 0
  const draftReports = reports?.filter((r) => r.status === "draft").length || 0
  const sentReports = reports?.filter((r) => r.status === "sent").length || 0
  const viewedReports = reports?.filter((r) => r.status === "viewed").length || 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Relatórios</h2>
          <p className="text-gray-600">Crie e gerencie relatórios para seus clientes</p>
        </div>
        <Button onClick={() => setShowNewReportDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Relatório
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
                <p className="text-sm text-gray-600">Total de Relatórios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{draftReports}</p>
                <p className="text-sm text-gray-600">Rascunhos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Send className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{sentReports}</p>
                <p className="text-sm text-gray-600">Enviados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{viewedReports}</p>
                <p className="text-sm text-gray-600">Visualizados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="w-5 h-5 text-gray-500" />
              <Input
                placeholder="Buscar relatórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Clientes</SelectItem>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="sent">Enviado</SelectItem>
                  <SelectItem value="viewed">Visualizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports?.map((report) => (
          <Card key={report.id} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <Badge className={getStatusColor(report.status)}>{getStatusText(report.status)}</Badge>
                    <Badge className={getTypeColor(report.type)}>{getTypeText(report.type)}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{report.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Cliente: {report.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Criado: {new Date(report.createdAt).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <span>Por: {report.createdBy}</span>
                    {report.sentAt && (
                      <>
                        <span>•</span>
                        <span>Enviado: {new Date(report.sentAt).toLocaleDateString("pt-BR")}</span>
                      </>
                    )}
                    {report.viewedAt && (
                      <>
                        <span>•</span>
                        <span>Visualizado: {new Date(report.viewedAt).toLocaleDateString("pt-BR")}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {report.status === "draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReport(report.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Enviar
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteReport(report.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports?.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Nenhum relatório encontrado</p>
            <p className="text-sm text-gray-400">Crie um novo relatório para começar</p>
          </CardContent>
        </Card>
      )}

      <NewReportDialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog} onAddReport={handleAddReport} />
    </div>
  )
}
