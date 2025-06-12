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
import { Plus, Trash2 } from "lucide-react"

interface NewOKRDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddOKR: (okr: any) => void
}

export function NewOKRDialog({ open, onOpenChange, onAddOKR }: NewOKRDialogProps) {
  const [objective, setObjective] = useState("")
  const [clientId, setClientId] = useState("")
  const [quarter, setQuarter] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [keyResults, setKeyResults] = useState([{ description: "", target: "", unit: "" }])

  const clients = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Santos" },
    { id: "3", name: "Pedro Costa" },
  ]

  const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"]

  const addKeyResult = () => {
    setKeyResults([...keyResults, { description: "", target: "", unit: "" }])
  }

  const removeKeyResult = (index: number) => {
    if (keyResults.length > 1) {
      setKeyResults(keyResults.filter((_, i) => i !== index))
    }
  }

  const updateKeyResult = (index: number, field: string, value: string) => {
    const updated = keyResults.map((kr, i) => (i === index ? { ...kr, [field]: value } : kr))
    setKeyResults(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!objective.trim() || !clientId || !quarter || !dueDate || !createdBy.trim()) return

    const selectedClient = clients.find((c) => c.id === clientId)

    const newOKR = {
      clientId,
      clientName: selectedClient?.name || "Cliente",
      objective: objective.trim(),
      quarter,
      dueDate,
      createdBy: createdBy.trim(),
      progress: 0,
      status: "on-track" as const,
      lastUpdated: new Date().toISOString().split("T")[0],
      keyResults: keyResults
        .filter((kr) => kr.description.trim() && kr.target.trim())
        .map((kr, index) => ({
          id: `kr-${Date.now()}-${index}`,
          description: kr.description.trim(),
          target: Number(kr.target),
          current: 0,
          unit: kr.unit.trim() || "unidades",
          progress: 0,
          status: "on-track" as const,
          lastUpdated: new Date().toISOString().split("T")[0],
        })),
    }

    onAddOKR(newOKR)

    // Reset form
    setObjective("")
    setClientId("")
    setQuarter("")
    setDueDate("")
    setCreatedBy("")
    setKeyResults([{ description: "", target: "", unit: "" }])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo OKR</DialogTitle>
          <DialogDescription>Crie um novo objetivo e resultados-chave para um cliente</DialogDescription>
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
              <Label htmlFor="quarter">Trimestre</Label>
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o trimestre" />
                </SelectTrigger>
                <SelectContent>
                  {quarters.map((q) => (
                    <SelectItem key={q} value={q}>
                      {q}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Objetivo</Label>
            <Textarea
              id="objective"
              placeholder="Ex: Aumentar a satisfação do cliente"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              required
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
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
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Resultados-Chave</Label>
              <Button type="button" variant="outline" size="sm" onClick={addKeyResult}>
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>

            {keyResults.map((kr, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Resultado-Chave {index + 1}</span>
                  {keyResults.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyResult(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Descrição do resultado-chave"
                    value={kr.description}
                    onChange={(e) => updateKeyResult(index, "description", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Meta (número)"
                    type="number"
                    value={kr.target}
                    onChange={(e) => updateKeyResult(index, "target", e.target.value)}
                  />
                  <Input
                    placeholder="Unidade (ex: %, pontos)"
                    value={kr.unit}
                    onChange={(e) => updateKeyResult(index, "unit", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Criar OKR
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
