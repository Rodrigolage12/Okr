"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Mail, Building, User, TrendingUp, CheckSquare } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  company: string
  username: string
  password: string
  status: "active" | "inactive"
  okrsCount: number
  tasksCount: number
  lastActivity: string
  joinedDate: string
}

interface ClientViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: Client | null
}

export function ClientViewDialog({ open, onOpenChange, client }: ClientViewDialogProps) {
  if (!client) return null

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getStatusText = (status: string) => {
    return status === "active" ? "Ativo" : "Inativo"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <Badge className={getStatusColor(client.status)}>{getStatusText(client.status)}</Badge>
            </div>
          </DialogTitle>
          <DialogDescription>Informações detalhadas do cliente</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Informações Pessoais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Nome:</span>
                  <span>{client.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Empresa:</span>
                  <span>{client.company}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Data de Cadastro:</span>
                  <span>{new Date(client.joinedDate).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Último Acesso:</span>
                  <span>{new Date(client.lastActivity).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Credenciais de Acesso */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Credenciais de Acesso</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Nome de Usuário:</span>
                  <p className="text-sm font-mono bg-white p-2 rounded border mt-1">{client.username}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Senha:</span>
                  <p className="text-sm font-mono bg-white p-2 rounded border mt-1">••••••••</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-900">{client.okrsCount}</p>
                    <p className="text-sm text-blue-700">OKRs Ativos</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-900">{client.tasksCount}</p>
                    <p className="text-sm text-green-700">Tarefas Totais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Atividades */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Histórico Recente</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Último acesso ao sistema</p>
                  <p className="text-xs text-gray-500">{new Date(client.lastActivity).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Cliente cadastrado no sistema</p>
                  <p className="text-xs text-gray-500">{new Date(client.joinedDate).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
