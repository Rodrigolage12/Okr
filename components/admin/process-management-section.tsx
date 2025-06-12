"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Target, TrendingUp, Filter, Clock, User, AlertCircle } from "lucide-react"
import { NewProcessDialog } from "@/components/admin/new-process-dialog"

interface ProcessStage {
  id: string
  name: string
  description: string
  tasks: ProcessTask[]
  progress: number
  status: "not-started" | "in-progress" | "completed"
}

interface ProcessTask {
  id: string
  title: string
  description?: string
  deadline: string
  responsible: "company" | "client"
  status: "pending" | "in-progress" | "completed" | "blocked"
  dependsOnClient: boolean
  priority: "low" | "medium" | "high"
  completedAt?: string
}

interface ClientProcess {
  id: string
  clientId: string
  clientName: string
  processType: string
  startDate: string
  expectedEndDate: string
  currentStage: number
  overallProgress: number
  status: "active" | "paused" | "completed"
  stages: ProcessStage[]
}

export function ProcessManagementSection() {
  const [processes, setProcesses] = useState<ClientProcess[]>([
    {
      id: "1",
      clientId: "1",
      clientName: "João Silva",
      processType: "Consultoria Estratégica",
      startDate: "2024-01-01",
      expectedEndDate: "2024-04-01",
      currentStage: 1,
      overallProgress: 35,
      status: "active",
      stages: [
        {
          id: "stage-1",
          name: "Início do Processo",
          description: "Etapas iniciais e alinhamento",
          progress: 70,
          status: "in-progress",
          tasks: [
            {
              id: "task-1",
              title: "Agendar Reunião de Briefing",
              description: "Primeira reunião para entender necessidades",
              deadline: "2024-01-15",
              responsible: "company",
              status: "completed",
              dependsOnClient: true,
              priority: "high",
              completedAt: "2024-01-12",
            },
            {
              id: "task-2",
              title: "Assinatura do Contrato",
              description: "Formalização da parceria",
              deadline: "2024-01-20",
              responsible: "client",
              status: "in-progress",
              dependsOnClient: true,
              priority: "high",
            },
          ],
        },
        {
          id: "stage-2",
          name: "Estratégia",
          description: "Desenvolvimento da estratégia",
          progress: 0,
          status: "not-started",
          tasks: [
            {
              id: "task-3",
              title: "Análise de Mercado",
              deadline: "2024-02-01",
              responsible: "company",
              status: "pending",
              dependsOnClient: false,
              priority: "medium",
            },
            {
              id: "task-4",
              title: "Definição de Objetivos",
              deadline: "2024-02-10",
              responsible: "company",
              status: "pending",
              dependsOnClient: true,
              priority: "high",
            },
          ],
        },
        {
          id: "stage-3",
          name: "Mão na Massa",
          description: "Implementação das estratégias",
          progress: 0,
          status: "not-started",
          tasks: [
            {
              id: "task-5",
              title: "Implementação Fase 1",
              deadline: "2024-03-01",
              responsible: "company",
              status: "pending",
              dependsOnClient: false,
              priority: "medium",
            },
          ],
        },
      ],
    },
  ])

  const [showNewProcessDialog, setShowNewProcessDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string>("all")

  const clients = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Santos" },
    { id: "3", name: "Pedro Costa" },
  ]

  const filteredProcesses =
    selectedClient === "all" ? processes : processes.filter((p) => p.clientId === selectedClient)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "paused":
        return "Pausado"
      case "completed":
        return "Concluído"
      default:
        return "Indefinido"
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluída"
      case "in-progress":
        return "Em Andamento"
      case "blocked":
        return "Bloqueada"
      case "pending":
        return "Pendente"
      default:
        return "Indefinido"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return "Indefinida"
    }
  }

  const addProcess = (newProcess: Omit<ClientProcess, "id">) => {
    const process: ClientProcess = {
      ...newProcess,
      id: Date.now().toString(),
    }
    setProcesses([...processes, process])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Processos</h2>
          <p className="text-gray-600">Acompanhe as etapas e tarefas de cada cliente</p>
        </div>
        <Button onClick={() => setShowNewProcessDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Processo
        </Button>
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
              {filteredProcesses.length} processo{filteredProcesses.length !== 1 ? "s" : ""} encontrado
              {filteredProcesses.length !== 1 ? "s" : ""}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredProcesses.map((process) => (
          <Card key={process.id} className="shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>{process.processType}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span>Cliente: {process.clientName}</span>
                    <span>•</span>
                    <span>Início: {new Date(process.startDate).toLocaleDateString("pt-BR")}</span>
                    <span>•</span>
                    <span>Previsão: {new Date(process.expectedEndDate).toLocaleDateString("pt-BR")}</span>
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(process.status)}>{getStatusText(process.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso Geral</span>
                  <span className="font-medium">{process.overallProgress}%</span>
                </div>
                <Progress value={process.overallProgress} className="h-2" />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Etapas do Processo</span>
                </h4>
                {process.stages.map((stage, stageIndex) => (
                  <div key={stage.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Etapa {stageIndex + 1}: {stage.name}
                        </h5>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{stage.progress}%</div>
                        <Progress value={stage.progress} className="h-1.5 w-20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {stage.tasks.map((task) => (
                        <div key={task.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h6 className="text-sm font-medium text-gray-900">{task.title}</h6>
                              {task.description && <p className="text-xs text-gray-600 mt-1">{task.description}</p>}
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Badge className={getTaskStatusColor(task.status)}>
                                {getTaskStatusText(task.status)}
                              </Badge>
                              <Badge className={getPriorityColor(task.priority)}>
                                {getPriorityText(task.priority)}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Prazo: {new Date(task.deadline).toLocaleDateString("pt-BR")}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>Responsável: {task.responsible === "company" ? "Empresa" : "Cliente"}</span>
                              </div>
                              {task.dependsOnClient && (
                                <div className="flex items-center space-x-1 text-orange-600">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>Depende do cliente</span>
                                </div>
                              )}
                            </div>
                            {task.completedAt && (
                              <span className="text-green-600">
                                Concluída em: {new Date(task.completedAt).toLocaleDateString("pt-BR")}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProcesses.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Nenhum processo encontrado</p>
            <p className="text-sm text-gray-400">
              {selectedClient === "all"
                ? "Adicione um novo processo para começar"
                : "Este cliente ainda não possui processos"}
            </p>
          </CardContent>
        </Card>
      )}

      <NewProcessDialog open={showNewProcessDialog} onOpenChange={setShowNewProcessDialog} onAddProcess={addProcess} />
    </div>
  )
}
