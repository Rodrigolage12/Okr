"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddClient: (client: any) => void
}

export function NewClientDialog({ open, onOpenChange, onAddClient }: NewClientDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [username, setUsername] = useState("")
  const [clientPassword, setClientPassword] = useState("")
  const [status, setStatus] = useState<"active" | "inactive">("active")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !company.trim() || !username.trim() || !clientPassword.trim()) return

    const newClient = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      username: username.trim(),
      password: clientPassword.trim(),
      status,
      okrsCount: 0,
      tasksCount: 0,
      lastActivity: new Date().toISOString().split("T")[0],
      joinedDate: new Date().toISOString().split("T")[0],
    }

    onAddClient(newClient)

    // Reset form
    setName("")
    setEmail("")
    setCompany("")
    setUsername("")
    setClientPassword("")
    setStatus("active")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>Adicione um novo cliente ao sistema e crie suas credenciais de acesso</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">Para comunicação e notificações</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              placeholder="Nome da Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Credenciais de Acesso</h4>

            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                placeholder="Ex: joao_silva"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Este será usado pelo cliente para fazer login</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPassword">Senha do Cliente</Label>
              <Input
                id="clientPassword"
                type="password"
                placeholder="Senha para o cliente"
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Forneça esta senha ao cliente</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: any) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Criar Cliente
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
