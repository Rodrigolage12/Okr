"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, User, Eye, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

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
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      title: "Relatório Mensal - Janeiro 2024",
      description: "Análise de performance e progresso dos OKRs do mês de janeiro",
      content: `# Relatório Mensal - Janeiro 2024

## Resumo Executivo

Este relatório apresenta o progresso dos seus OKRs durante o mês de janeiro de 2024. Observamos avanços significativos em várias áreas, com destaque para o aumento da satisfação do cliente.

## Progresso dos OKRs

### 1. Aumentar a satisfação do cliente (75% concluído)
- **NPS atual**: 64 pontos (meta: 80 pontos)
- **Tempo de resposta**: 2.8 horas (meta: 2 horas)
- **Status**: No prazo

### 2. Expandir base de clientes (45% concluído)
- **Novos clientes**: 200 (meta: 500)
- **Aumento de receita**: 15% (meta: 30%)
- **Status**: Em risco

## Principais Conquistas

1. ✅ Implementação do novo sistema de atendimento
2. ✅ Treinamento da equipe de suporte
3. ✅ Lançamento da campanha de marketing digital

## Desafios Identificados

- Necessidade de acelerar a aquisição de novos clientes
- Otimização do tempo de resposta do suporte
- Melhoria nos processos de onboarding

## Próximos Passos

1. **Fevereiro 2024**:
   - Implementar estratégias de aquisição mais agressivas
   - Otimizar processos de atendimento
   - Revisar metas de crescimento

2. **Reunião de Acompanhamento**:
   - Data: 15/02/2024
   - Horário: 14:00
   - Pauta: Discussão das estratégias para Q1

## Conclusão

O progresso está dentro do esperado, com algumas áreas necessitando atenção especial. Continuamos confiantes no alcance das metas trimestrais.

---
*Relatório gerado por: Ana Silva - Consultora*  
*Data: 26/01/2024*`,
      type: "monthly",
      sentAt: "2024-01-26",
      viewedAt: "2024-01-27",
      createdBy: "Ana Silva - Consultora",
      isNew: false,
    },
    {
      id: "2",
      title: "Relatório de Projeto - Consultoria Estratégica",
      description: "Relatório de progresso do projeto de consultoria estratégica",
      content: `# Relatório de Projeto - Consultoria Estratégica

## Status do Projeto

**Período**: Janeiro 2024  
**Progresso Geral**: 35%  
**Status**: Em andamento

## Etapas Concluídas

### ✅ Etapa 1: Início do Processo (70% concluído)
- Reunião de briefing realizada
- Contrato assinado
- Equipe alocada
- Cronograma definido

### 🔄 Etapa 2: Estratégia (Em andamento)
- Análise de mercado: 60% concluído
- Definição de objetivos: Aguardando feedback do cliente
- Mapeamento de processos: Iniciado

### ⏳ Etapa 3: Implementação (Não iniciado)
- Aguardando conclusão da etapa anterior

## Principais Entregas

1. **Documento de Briefing** ✅
2. **Análise de Mercado** 🔄 (Em progresso)
3. **Plano Estratégico** ⏳ (Próxima etapa)

## Próximas Ações

- Finalizar análise de mercado até 05/02/2024
- Agendar reunião para validação dos objetivos
- Iniciar desenvolvimento do plano estratégico

## Observações

O projeto está progredindo conforme o cronograma. A colaboração da equipe do cliente tem sido excelente, facilitando o andamento das atividades.

---
*Relatório gerado por: Carlos Santos - Diretor de Projetos*  
*Data: 21/01/2024*`,
      type: "project",
      sentAt: "2024-01-21",
      viewedAt: "2024-01-22",
      createdBy: "Carlos Santos - Diretor",
      isNew: false,
    },
    {
      id: "3",
      title: "Relatório Semanal - Semana 3 de Janeiro",
      description: "Acompanhamento semanal das atividades e progresso",
      content: `# Relatório Semanal - Semana 3 de Janeiro

## Resumo da Semana

Semana produtiva com avanços importantes nos principais objetivos.

## Atividades Realizadas

- Reunião de alinhamento com a equipe
- Revisão dos processos de atendimento
- Análise dos dados de satisfação do cliente
- Preparação da campanha de marketing

## Métricas da Semana

- **Novos leads**: 45
- **Conversões**: 12
- **NPS médio**: 62 pontos
- **Tempo médio de resposta**: 3.2 horas

## Próxima Semana

- Implementar melhorias no atendimento
- Lançar nova campanha
- Reunião de revisão mensal

---
*Relatório gerado por: Ana Silva - Consultora*  
*Data: 29/01/2024*`,
      type: "custom",
      sentAt: "2024-01-29",
      createdBy: "Ana Silva - Consultora",
      isNew: true,
    },
  ])

  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const markAsViewed = (reportId: string) => {
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              viewedAt: new Date().toISOString().split("T")[0],
              isNew: false,
            }
          : report,
      ),
    )
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

  const newReportsCount = reports.filter((r) => r.isNew).length

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
        {filteredReports.map((report) => (
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
        ))}
      </div>

      {filteredReports.length === 0 && (
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
