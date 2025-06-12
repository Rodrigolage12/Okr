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

interface NewProcessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProcess: (process: any) => void
}

export function NewProcessDialog({ open, onOpenChange, onAddProcess }: NewProcessDialogProps) {
  const [processType, setProcessType] = useState("")
  const [clientId, setClientId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [expectedEndDate, setExpectedEndDate] = useState("")
  const [description, setDescription] = useState("")

  const clients = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Santos" },
    { id: "3", name: "Pedro Costa" },
  ]

  const processTypes = [
    "Consultoria Estratégica",
    "Desenvolvimento de Sistema",
    "Marketing Digital",
    "Treinamento Corporativo",
    "Auditoria de Processos",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!processType.trim() || !clientId || !startDate || !expectedEndDate) return

    const selectedClient = clients.find((c) => c.id === clientId)

    const newProcess = {
      clientId,
      clientName: selectedClient?.name || "Cliente",
      processType: processType.trim(),
      startDate,
      expectedEndDate,
      currentStage: 0,
      overallProgress: 0,
      status: "active" as const,
      stages: [
        {
          id: "stage-1",
          name: "Início do Processo",
          description: "Etapas iniciais e alinhamento",
          progress: 0,
          status: "not-started" as const,
          tasks: [
            {
              id: "task-1",
              title: "Agendar Reunião de Briefing",
              description: "Primeira reunião para entender necessidades",
              deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              responsible: "company" as const,
              status: "pending" as const,
              dependsOnClient: true,
              priority: "high" as const,
            },
            {
              id: "task-2",
              title: "Assinatura do Contrato",
              description: "Formalização da parceria",
              deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              responsible: "client" as const,
              status: "pending" as const,
              dependsOnClient: true,
              priority: "high" as const,
            },
          ],
        },
        {
          id: "stage-2",
          name: "Estratégia",
          description: "Desenvolvimento da estratégia",
          progress: 0,
          status: "not-started" as const,
          tasks: [
            {
              id: "task-3",
              title: "Análise de Mercado",
              deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              responsible: "company" as const,
              status: "pending" as const,
              dependsOnClient: false,
              priority: "medium" as const,
            },
          ],
        },
        {
          id: "stage-3",
          name: "Mão na Massa",
          description: "Implementação das estratégias",
          progress: 0,
          status: "not-started" as const,
          tasks: [
            {
              id: "task-4",
              title: "Implementação Fase 1",
              deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              responsible: "company" as const,
              status: "pending" as const,
              dependsOnClient: false,
              priority: "medium" as const,
            },
          ],
        },
      ],
    }

    onAddProcess(newProcess)

    // Reset form
    setProcessType("")
    setClientId("")
    setStartDate("")
    setExpectedEndDate("")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Processo</DialogTitle>
          <DialogDescription>Inicie um novo processo com um cliente</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="processType">Tipo de Processo</Label>
            <Select value={processType} onValueChange={setProcessType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {processTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedEndDate">Previsão de Término</Label>
              <Input
                id="expectedEndDate"
                type="date"
                value={expectedEndDate}
                onChange={(e) => setExpectedEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Detalhes sobre o processo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Criar Processo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
