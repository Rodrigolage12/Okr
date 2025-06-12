"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Clock, Bell, Shield, Save } from "lucide-react"

export function SystemSettingsSection() {
  const [settings, setSettings] = useState({
    companyName: "Minha Empresa",
    workingHours: {
      start: "09:00",
      end: "18:00",
      interval: 30,
    },
    notifications: {
      email: true,
      push: false,
      reminders: true,
    },
    security: {
      sessionTimeout: 60,
      requirePasswordChange: false,
    },
    customization: {
      primaryColor: "#3B82F6",
      logo: "",
      welcomeMessage: "Bem-vindo ao sistema de OKRs!",
    },
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h2>
          <p className="text-gray-600">Gerencie as configurações globais da aplicação</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configurações da Empresa</span>
            </CardTitle>
            <CardDescription>Informações básicas da empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
              <Textarea
                id="welcomeMessage"
                value={settings.customization.welcomeMessage}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    customization: { ...settings.customization, welcomeMessage: e.target.value },
                  })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Horário de Funcionamento</span>
            </CardTitle>
            <CardDescription>Configure os horários de trabalho e intervalos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Horário de Início</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workingHours: { ...settings.workingHours, start: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Horário de Término</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workingHours: { ...settings.workingHours, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interval">Intervalo entre Agendamentos (minutos)</Label>
              <Select
                value={settings.workingHours.interval.toString()}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    workingHours: { ...settings.workingHours, interval: Number(value) },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificações</span>
            </CardTitle>
            <CardDescription>Configure as preferências de notificação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por Email</Label>
                <p className="text-sm text-gray-600">Receber notificações importantes por email</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, email: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Push</Label>
                <p className="text-sm text-gray-600">Receber notificações push no navegador</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, push: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lembretes Automáticos</Label>
                <p className="text-sm text-gray-600">Enviar lembretes de tarefas e prazos</p>
              </div>
              <Switch
                checked={settings.notifications.reminders}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, reminders: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Segurança</span>
            </CardTitle>
            <CardDescription>Configurações de segurança e acesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
              <Select
                value={settings.security.sessionTimeout.toString()}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: Number(value) },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                  <SelectItem value="480">8 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exigir Troca de Senha</Label>
                <p className="text-sm text-gray-600">Forçar usuários a trocar senha periodicamente</p>
              </div>
              <Switch
                checked={settings.security.requirePasswordChange}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, requirePasswordChange: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
