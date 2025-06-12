"use client"

import type { User } from "@/app/page"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Target, Calendar, CheckSquare, Users, Settings } from "lucide-react"
import { ProcessManagementSection } from "@/components/admin/process-management-section"
import { AdminAgendaSection } from "@/components/admin/admin-agenda-section"
import { AdminTasksSection } from "@/components/admin/admin-tasks-section"
import { ClientManagementSection } from "@/components/admin/client-management-section"
import { SystemSettingsSection } from "@/components/admin/system-settings-section"

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("processes")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gestão de Processos - Empresa</h1>
                <p className="text-sm text-gray-600">Painel Administrativo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
              <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="processes" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Processos</span>
            </TabsTrigger>
            <TabsTrigger value="agenda" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Reuniões</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4" />
              <span>Tarefas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <ClientManagementSection />
          </TabsContent>

          <TabsContent value="processes" className="space-y-6">
            <ProcessManagementSection />
          </TabsContent>

          <TabsContent value="agenda" className="space-y-6">
            <AdminAgendaSection />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <AdminTasksSection />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettingsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
