"use client"

import type { User } from "@/app/page"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Target, Calendar, ListChecks } from "lucide-react"
import { ClientOKRSection } from "@/components/client/client-okr-section"
import { ClientAgendaSection } from "@/components/client/client-agenda-section"

interface ClientDashboardProps {
  user: User
  onLogout: () => void
}

export function ClientDashboard({ user, onLogout }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState("okrs")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Meus OKRs</h1>
                <p className="text-sm text-gray-600">Portal do Cliente</p>
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
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="okrs" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Meus OKRs</span>
            </TabsTrigger>
            <TabsTrigger value="agenda" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Agendamentos</span>
            </TabsTrigger>
            <TabsTrigger value="process" className="flex items-center space-x-2">
              <ListChecks className="w-4 h-4" />
              <span>Meu Processo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="okrs" className="space-y-6">
            <ClientOKRSection userId={user.id} />
          </TabsContent>

          <TabsContent value="agenda" className="space-y-6">
            <ClientAgendaSection userId={user.id} />
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <ClientOKRSection userId={user.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
