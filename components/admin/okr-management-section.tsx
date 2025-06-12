"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Target, TrendingUp, Filter, Edit2, Trash2, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { NewOKRDialog } from "@/components/admin/new-okr-dialog"

interface KeyResult {
  id: string
  description: string
  progress: number
  target: number
  current: number
  unit: string
  status: "on-track" | "at-risk" | "off-track"
  lastUpdated: string
}

interface OKR {
  id: string
  clientId: string
  clientName: string
  objective: string
  keyResults: KeyResult[]
  progress: number
  status: "on-track" | "at-risk" | "off-track"
  quarter: string
  dueDate: string
  createdBy: string
  lastUpdated: string
}

export function OKRManagementSection() {
  const [okrs, setOKRs] = useState<OKR[]>([
    {
      id: "1",
      clientId: "1",
      clientName: "João Silva",
      objective: "Aumentar a satisfação do cliente",
      progress: 75,
      status: "on-track",
      quarter: "Q1 2024",
      dueDate: "2024-03-31",
      createdBy: "Ana Silva",
      lastUpdated: "2024-01-15",
      keyResults: [
        {
          id: "1",
          description: "Alcançar NPS de 80 pontos",
          progress: 80,
          target: 80,
          current: 64,
          unit: "pontos",
          status: "on-track",
          lastUpdated: "2024-01-15",
        },
        {
          id: "2",
          description: "Reduzir tempo de resposta para 2 horas",
          progress: 70,
          target: 2,
          current: 2.8,
          unit: "horas",
          status: "at-risk",
          lastUpdated: "2024-01-14",
        },
      ],
    },
    {
      id: "2",
      clientId: "2",
      clientName: "Maria Santos",
      objective: "Expandir base de clientes",
      progress: 45,
      status: "at-risk",
      quarter: "Q1 2024",
      dueDate: "2024-03-31",
      createdBy: "Carlos Santos",
      lastUpdated: "2024-01-12",
      keyResults: [
        {
          id: "3",
          description: "Adquirir 500 novos clientes",
          progress: 40,
          target: 500,
          current: 200,
          unit: "clientes",
          status: "at-risk",
          lastUpdated: "2024-01-12",
        },
      ],
    },
  ])

  const [showNewOKRDialog, setShowNewOKRDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string>("all")

  const clients = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Santos" },
    { id: "3", name: "Pedro Costa" },
  ]

  const filteredOKRs = selectedClient === "all" ? okrs : okrs.filter((okr) => okr.clientId === selectedClient)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800"
      case "at-risk":
        return "bg-yellow-100 text-yellow-800"
      case "off-track":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-track":
        return "No Prazo"
      case "at-risk":
        return "Em Risco"
      case "off-track":
        return "Atrasado"
      default:
        return "Indefinido"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "at-risk":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "off-track":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const addOKR = (newOKR: Omit<OKR, "id">) => {
    const okr: OKR = {
      ...newOKR,
      id: Date.now().toString(),
    }
    setOKRs([...okrs, okr])
  }

  const deleteOKR = (id: string) => {
    setOKRs(okrs.filter((okr) => okr.id !== id))
  }

  const totalOKRs = okrs.length
  const onTrackCount = okrs.filter((okr) => okr.status === "on-track").length
  const atRiskCount = okrs.filter((okr) => okr.status === "at-risk").length
  const offTrackCount = okrs.filter((okr) => okr.status === "off-track").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de OKRs</h2>
          <p className="text-gray-600">Gerencie os objetivos e resultados-chave dos clientes</p>
        </div>
        <Button onClick={() => setShowNewOKRDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo OKR
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalOKRs}</p>
                <p className="text-sm text-gray-600">Total de OKRs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{onTrackCount}</p>
                <p className="text-sm text-gray-600">No Prazo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{atRiskCount}</p>
                <p className="text-sm text-gray-600">Em Risco</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{offTrackCount}</p>
                <p className="text-sm text-gray-600">Atrasados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Filtrar por cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Clientes</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredOKRs.length} OKR{filteredOKRs.length !== 1 ? "s" : ""} encontrado
              {filteredOKRs.length !== 1 ? "s" : ""}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OKRs List */}
      <div className="grid gap-6">
        {filteredOKRs.map((okr) => (
          <Card key={okr.id} className="shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>{okr.objective}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span>Cliente: {okr.clientName}</span>
                    <span>•</span>
                    <span>{okr.quarter}</span>
                    <span>•</span>
                    <span>Criado por: {okr.createdBy}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(okr.status)}
                  <Badge className={getStatusColor(okr.status)}>{getStatusText(okr.status)}</Badge>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteOKR(okr.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso Geral</span>
                  <span className="font-medium">{okr.progress}%</span>
                </div>
                <Progress value={okr.progress} className="h-3" />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Resultados-Chave</span>
                </h4>
                {okr.keyResults.map((kr) => (
                  <div key={kr.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getStatusIcon(kr.status)}
                          <p className="text-sm font-medium text-gray-900">{kr.description}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Última atualização: {new Date(kr.lastUpdated).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <span className="text-sm text-gray-600 font-medium">
                          {kr.current}/{kr.target} {kr.unit}
                        </span>
                        <Badge className={`${getStatusColor(kr.status)} ml-2`} size="sm">
                          {getStatusText(kr.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Progresso</span>
                        <span>{kr.progress}%</span>
                      </div>
                      <Progress value={kr.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOKRs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Nenhum OKR encontrado</p>
            <p className="text-sm text-gray-400">
              {selectedClient === "all" ? "Adicione um novo OKR para começar" : "Este cliente ainda não possui OKRs"}
            </p>
          </CardContent>
        </Card>
      )}

      <NewOKRDialog open={showNewOKRDialog} onOpenChange={setShowNewOKRDialog} onAddOKR={addOKR} />
    </div>
  )
}
