"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useOKRs } from "@/hooks/use-supabase-data"

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
  objective: string
  keyResults: KeyResult[]
  progress: number
  status: "on-track" | "at-risk" | "off-track"
  quarter: string
  dueDate: string
  createdBy: string
  lastUpdated: string
}

interface ClientOKRSectionProps {
  userId: string
}

export function ClientOKRSection({ userId }: ClientOKRSectionProps) {
  const { okrs, loading, error } = useOKRs(userId)

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

  const overallProgress =
    okrs?.length > 0 ? Math.round(okrs.reduce((sum, okr) => sum + okr.progress, 0) / okrs.length) : 0
  const onTrackCount = okrs?.filter((okr) => okr.status === "on-track").length
  const atRiskCount = okrs?.filter((okr) => okr.status === "at-risk").length
  const offTrackCount = okrs?.filter((okr) => okr.status === "off-track").length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Meus Objetivos e Resultados-Chave (OKRs)</h2>
        <p className="text-gray-600">OKRs definidos pela empresa para acompanhar seu progresso</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{okrs?.length}</p>
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
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
                <p className="text-sm text-gray-600">Progresso Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OKRs List */}
      <div className="grid gap-6">
        {okrs?.map((okr) => (
          <Card key={okr.id} className="shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>{okr.objective}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{okr.quarter}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Prazo: {new Date(okr.dueDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <span>•</span>
                    <span>Criado por: {okr.createdBy}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(okr.status)}
                  <Badge className={getStatusColor(okr.status)}>{getStatusText(okr.status)}</Badge>
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

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Nota:</strong> Os OKRs são definidos e atualizados pela empresa. Entre em contato com seu
                  consultor para discutir o progresso ou fazer ajustes.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {okrs?.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum OKR encontrado</h3>
            <p className="text-gray-500">Seus OKRs aparecerão aqui quando forem criados pela empresa.</p>
            <p className="text-sm text-gray-400">Entre em contato com sua empresa para definir novos objetivos.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
