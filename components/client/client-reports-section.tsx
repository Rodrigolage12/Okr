"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, User, Eye, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useReports } from "@/hooks/use-supabase-data"

interface Report {
  id: string
  title: string
  description: string
  content: string
  type: "monthly" | "quarterly" | "project" | "custom"
  sentAt: string
  viewedAt?: string
  createdBy: string
  isNew: boolean
}

interface ClientReportsSectionProps {
  userId: string
}

export function ClientReportsSection({ userId }: ClientReportsSectionProps) {
  const { reports, loading, error } = useReports(userId)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = reports?.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const markAsViewed = (reportId: string) => {
    // setReports(
    //   reports.map((report) =>
    //     report.id === reportId
    //       ? {
    //           ...report,
    //           viewedAt: new Date().toISOString().split("T")[0],
    //           isNew: false,
    //         }
    //       : report,
    //   ),
    // )
  }

  const openReport = (report: Report) => {
    setSelectedReport(report)
    if (report.isNew) {
      markAsViewed(report.id)
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

  const newReportsCount = reports?.filter((r) => r.isNew).length || 0

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedReport(null)}>
            ← Voltar aos Relatórios
          </Button>
          <div className="flex items-center space-x-2">
            <Badge className={getTypeColor(selectedReport.type)}>{getTypeText(selectedReport.type)}</Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedReport.title}</CardTitle>
            <CardDescription className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{selectedReport.createdBy}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Enviado em: {new Date(selectedReport.sentAt).toLocaleDateString("pt-BR")}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{selectedReport.content}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meus Relatórios</h2>
          <p className="text-gray-600">
            Relatórios enviados pela empresa {newReportsCount > 0 && `(${newReportsCount} novos)`}
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar relatórios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {loading ? (
          <p>Carregando relatórios...</p>
        ) : error ? (
          <p>Erro ao carregar relatórios.</p>
        ) : (
          filteredReports?.map((report) => (
            <Card
              key={report.id}
              className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                report.isNew ? "ring-2 ring-blue-200 bg-blue-50" : ""
              }`}
              onClick={() => openReport(report)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      {report.isNew && <Badge className="bg-blue-100 text-blue-800 animate-pulse">Novo</Badge>}
                      <Badge className={getTypeColor(report.type)}>{getTypeText(report.type)}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{report.createdBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Enviado: {new Date(report.sentAt).toLocaleDateString("pt-BR")}</span>
                      </div>
                      {report.viewedAt && (
                        <>
                          <span>•</span>
                          <span>Visualizado: {new Date(report.viewedAt).toLocaleDateString("pt-BR")}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      {report.isNew ? "Ler" : "Ver"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredReports?.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Nenhum relatório encontrado</p>
            <p className="text-sm text-gray-400">
              {searchTerm ? "Tente ajustar sua busca" : "Os relatórios da empresa aparecerão aqui"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
