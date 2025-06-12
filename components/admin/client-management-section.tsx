"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Eye, Edit2, Trash2, Users, TrendingUp, Key } from "lucide-react"
import { NewClientDialog } from "@/components/admin/new-client-dialog"
import { ClientCredentialsDialog } from "@/components/admin/client-credentials-dialog"
import { ClientViewDialog } from "@/components/admin/client-view-dialog"
import { EditClientDialog } from "@/components/admin/edit-client-dialog"

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

export function ClientManagementSection() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@empresa.com",
      company: "Tech Solutions",
      username: "joao_silva",
      password: "senha123",
      status: "active",
      okrsCount: 3,
      tasksCount: 12,
      lastActivity: "2024-01-15",
      joinedDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@startup.com",
      company: "Startup Inovadora",
      username: "maria_santos",
      password: "senha456",
      status: "active",
      okrsCount: 2,
      tasksCount: 8,
      lastActivity: "2024-01-14",
      joinedDate: "2024-01-05",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@consultoria.com",
      company: "Consultoria Pro",
      username: "pedro_costa",
      password: "senha789",
      status: "inactive",
      okrsCount: 1,
      tasksCount: 3,
      lastActivity: "2024-01-10",
      joinedDate: "2023-12-20",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showNewClientDialog, setShowNewClientDialog] = useState(false)
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedClientForView, setSelectedClientForView] = useState<Client | null>(null)
  const [selectedClientForEdit, setSelectedClientForEdit] = useState<Client | null>(null)

  const viewClient = (client: Client) => {
    setSelectedClientForView(client)
    setShowViewDialog(true)
  }

  const editClient = (client: Client) => {
    setSelectedClientForEdit(client)
    setShowEditDialog(true)
  }

  const updateClient = (updatedClient: Client) => {
    setClients(clients.map((client) => (client.id === updatedClient.id ? updatedClient : client)))
  }

  const deleteClient = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.")) {
      setClients(clients.filter((client) => client.id !== id))
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addClient = (newClient: Omit<Client, "id">) => {
    const client: Client = {
      ...newClient,
      id: Date.now().toString(),
    }
    setClients([...clients, client])
  }

  const viewCredentials = (client: Client) => {
    setSelectedClient(client)
    setShowCredentialsDialog(true)
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getStatusText = (status: string) => {
    return status === "active" ? "Ativo" : "Inativo"
  }

  const activeClients = clients.filter((c) => c.status === "active").length
  const totalOKRs = clients.reduce((sum, c) => sum + c.okrsCount, 0)
  const totalTasks = clients.reduce((sum, c) => sum + c.tasksCount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Clientes</h2>
          <p className="text-gray-600">Gerencie todos os clientes e suas credenciais de acesso</p>
        </div>
        <Button onClick={() => setShowNewClientDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                <p className="text-sm text-gray-600">Total de Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
                <p className="text-sm text-gray-600">Clientes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
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
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
                <p className="text-sm text-gray-600">Total de Tarefas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar clientes por nome, email, empresa ou usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <p className="text-sm text-gray-500">{client.company}</p>
                    <p className="text-sm text-blue-600 font-medium">Login: {client.username}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{client.okrsCount}</p>
                    <p className="text-xs text-gray-500">OKRs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{client.tasksCount}</p>
                    <p className="text-xs text-gray-500">Tarefas</p>
                  </div>
                  <div className="text-center">
                    <Badge className={getStatusColor(client.status)}>{getStatusText(client.status)}</Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      Último acesso: {new Date(client.lastActivity).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => viewCredentials(client)}>
                    <Key className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => viewClient(client)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => editClient(client)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteClient(client.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Nenhum cliente encontrado</p>
            <p className="text-sm text-gray-400">Tente ajustar os filtros de busca</p>
          </CardContent>
        </Card>
      )}

      <NewClientDialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog} onAddClient={addClient} />

      <ClientCredentialsDialog
        open={showCredentialsDialog}
        onOpenChange={setShowCredentialsDialog}
        client={selectedClient}
      />

      <ClientViewDialog open={showViewDialog} onOpenChange={setShowViewDialog} client={selectedClientForView} />

      <EditClientDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        client={selectedClientForEdit}
        onUpdateClient={updateClient}
      />
    </div>
  )
}
