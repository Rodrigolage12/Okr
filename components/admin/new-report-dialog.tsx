"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddReport: (report: any) => void
}

export function NewReportDialog({ open, onOpenChange, onAddReport }: NewReportDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [clientId, setClientId] = useState("")
  const [type, setType] = useState<"monthly" | "quarterly" | "project" | "custom">("monthly")
  const [createdBy, setCreatedBy] = useState("")

  const clients = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Santos" },
    { id: "3", name: "Pedro Costa" },
  ]

  const reportTypes = [
    { value: "monthly", label: "Relatório Mensal" },
    { value: "quarterly", label: "Relatório Trimestral" },
    { value: "project", label: "Relatório de Projeto" },
    { value: "custom", label: "Relatório Personalizado" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !content.trim() || !clientId || !createdBy.trim()) return

    const selectedClient = clients.find((c) => c.id === clientId)

    const newReport = {
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      clientId,
      clientName: selectedClient?.name || "Cliente",
      type,
      status: "draft" as const,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: createdBy.trim(),
    }

    onAddReport(newReport)

    // Reset form
    setTitle("")
    setDescription("")
    setContent("")
    setClientId("")
    setType("monthly")
    setCreatedBy("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Relatório</DialogTitle>
          <DialogDescription>Crie um novo relatório para enviar ao cliente</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Relatório</Label>
              <Select value={type} onValueChange={(value: any) => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((reportType) => (
                    <SelectItem key={reportType.value} value={reportType.value}>
                      {reportType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título do Relatório</Label>
            <Input
              id="title"
              placeholder="Ex: Relatório Mensal - Janeiro 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Breve descrição do conteúdo do relatório..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo do Relatório</Label>
            <Textarea
              id="content"
              placeholder="Digite o conteúdo completo do relatório aqui. Você pode usar Markdown para formatação.

Exemplo:
## Resumo Executivo
Este relatório apresenta...

## Progresso dos OKRs
- Objetivo 1: 75% concluído
- Objetivo 2: 45% concluído

## Próximos Passos
1. Implementar melhorias...
2. Agendar reunião..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Dica: Use Markdown para formatação (## para títulos, - para listas, **texto** para negrito)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="createdBy">Criado por</Label>
            <Input
              id="createdBy"
              placeholder="Ex: Ana Silva"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Criar Relatório
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
