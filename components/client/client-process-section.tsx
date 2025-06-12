"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Calendar, Clock, User, AlertCircle, CheckCircle } from "lucide-react"

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
  processType: string
  startDate: string
  expectedEndDate: string
  currentStage: number
  overallProgress: number
  status: "active" | "paused" | "completed"
  stages: ProcessStage[]
}

interface ClientProcessSectionProps {
  userId: string
}

export function ClientProcessSection({ userId }: ClientProcessSectionProps) {
  const [process] = useState<ClientProcess>({
    id: "1",
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
  })

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "not-started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStageStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluída"
      case "in-progress":
        return "Em Andamento"
      case "not-started":
        return "Não Iniciada"
      default:
        return "Indefinida"
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
        return "Indefinida"
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Meu Processo: {process.processType}</h2>
        <p className="text-gray-600">Acompanhe o progresso das etapas do seu projeto</p>
      </div>

      {/* Process Overview */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>{process.processType}</span>
              </CardTitle>
              <CardDescription className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Início: {new Date(process.startDate).toLocaleDateString("pt-BR")}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Previsão: {new Date(process.expectedEndDate).toLocaleDateString("pt-BR")}</span>
                </div>
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">Ativo</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso Geral</span>
              <span className="font-medium">{process.overallProgress}%</span>
            </div>
            <Progress value={process.overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Process Stages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Etapas do Processo</span>
        </h3>

        {process.stages.map((stage, stageIndex) => (
          <Card key={stage.id} className="shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Etapa {stageIndex + 1}: {stage.name}
                  </h4>
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStageStatusColor(stage.status)}>{getStageStatusText(stage.status)}</Badge>
                  <div className="text-right">
                    <div className="text-sm font-medium">{stage.progress}%</div>
                    <Progress value={stage.progress} className="h-1.5 w-20" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.tasks.map((task) => (
                <div key={task.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {task.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        )}
                        <h5 className="text-sm font-medium text-gray-900">{task.title}</h5>
                      </div>
                      {task.description && <p className="text-xs text-gray-600 ml-6">{task.description}</p>}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge className={getTaskStatusColor(task.status)}>{getTaskStatusText(task.status)}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>{getPriorityText(task.priority)}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 ml-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Prazo: {new Date(task.deadline).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Responsável: {task.responsible === "company" ? "Empresa" : "Você"}</span>
                      </div>
                      {task.dependsOnClient && task.responsible === "client" && (
                        <div className="flex items-center space-x-1 text-orange-600">
                          <AlertCircle className="w-3 h-3" />
                          <span>Aguarda sua ação</span>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {process.stages
              .flatMap((stage) => stage.tasks)
              .filter((task) => task.responsible === "client" && task.status !== "completed")
              .slice(0, 3)
              .map((task) => (
                <div key={task.id} className="flex items-center space-x-2 text-sm text-blue-800">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {task.title} - Prazo: {new Date(task.deadline).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              ))}
            {process.stages
              .flatMap((stage) => stage.tasks)
              .filter((task) => task.responsible === "client" && task.status !== "completed").length === 0 && (
              <p className="text-sm text-blue-800">
                Nenhuma ação pendente no momento. A empresa está trabalhando nas próximas etapas.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
