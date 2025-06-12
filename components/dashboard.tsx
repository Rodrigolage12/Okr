"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Target, Calendar, CheckSquare } from "lucide-react"
import { AgendaSection } from "@/components/agenda-section"
import { TasksSection } from "@/components/tasks-section"
import { ProcessManagementSection } from "@/components/admin/process-management-section"

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
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
              <h1 className="text-xl font-bold text-gray-900">Gestão de Processos</h1>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="processes" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Processos</span>
            </TabsTrigger>
            <TabsTrigger value="agenda" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Agenda</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4" />
              <span>Tarefas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processes" className="space-y-6">
            <ProcessManagementSection />
          </TabsContent>

          <TabsContent value="agenda" className="space-y-6">
            <AgendaSection />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <TasksSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
