"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, CalendarIcon, Video, MapPin } from "lucide-react"

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  duration: number
  type: "presencial" | "online" | "telefone"
  location?: string
  meetingLink?: string
  description?: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  organizer: string
}

interface ClientAgendaSectionProps {
  userId: string
}

export function ClientAgendaSection({ userId }: ClientAgendaSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [meetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Reunião de Briefing",
      date: "2024-01-15",
      time: "10:00",
      duration: 60,
      type: "online",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      description: "Primeira reunião para entender necessidades e objetivos",
      status: "confirmed",
      organizer: "Ana Silva - Consultora",
    },
    {
      id: "2",
      title: "Apresentação da Estratégia",
      date: "2024-01-22",
      time: "14:00",
      duration: 90,
      type: "presencial",
      location: "Escritório da empresa - Sala de Reuniões 1",
      description: "Apresentação da estratégia desenvolvida",
      status: "scheduled",
      organizer: "Carlos Santos - Diretor",
    },
    {
      id: "3",
      title: "Acompanhamento Semanal",
      date: "2024-01-29",
      time: "15:30",
      duration: 30,
      type: "telefone",
      description: "Reunião de acompanhamento do progresso",
      status: "scheduled",
      organizer: "Ana Silva - Consultora",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "scheduled":
        return "Agendada"
      case "completed":
        return "Concluída"
      case "cancelled":
        return "Cancelada"
      default:
        return "Indefinida"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "online":
        return <Video className="w-4 h-4" />
      case "presencial":
        return <MapPin className="w-4 h-4" />
      case "telefone":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "online":
        return "Online"
      case "presencial":
        return "Presencial"
      case "telefone":
        return "Telefone"
      default:
        return "Indefinido"
    }
  }

  const upcomingMeetings = meetings
    .filter((meeting) => new Date(meeting.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastMeetings = meetings
    .filter((meeting) => new Date(meeting.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Minhas Reuniões</h2>
        <p className="text-gray-600">Reuniões agendadas pela empresa para acompanhamento do projeto</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <span>Calendário</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              modifiers={{
                meeting: meetings.map((m) => new Date(m.date)),
              }}
              modifiersStyles={{
                meeting: { backgroundColor: "#dbeafe", color: "#1e40af" },
              }}
            />
            <div className="mt-4 text-sm text-gray-600">
              <p>• Dias em azul possuem reuniões agendadas</p>
              <p>• Todas as reuniões são organizadas pela empresa</p>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Details */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Reuniões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {upcomingMeetings.length > 0 ? (
                upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                        <p className="text-sm text-gray-600">Organizado por: {meeting.organizer}</p>
                      </div>
                      <Badge className={getStatusColor(meeting.status)}>{getStatusText(meeting.status)}</Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{new Date(meeting.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {meeting.time} ({meeting.duration}min)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(meeting.type)}
                        <span>{getTypeText(meeting.type)}</span>
                      </div>
                    </div>

                    {meeting.description && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{meeting.description}</p>
                    )}

                    {meeting.type === "online" && meeting.meetingLink && (
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-sm text-blue-800 font-medium">Link da reunião:</p>
                        <a
                          href={meeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {meeting.meetingLink}
                        </a>
                      </div>
                    )}

                    {meeting.type === "presencial" && meeting.location && (
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-sm text-green-800 font-medium">Local:</p>
                        <p className="text-sm text-green-700">{meeting.location}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma reunião agendada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Reuniões Anteriores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pastMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">{meeting.title}</h5>
                    <p className="text-sm text-gray-600">
                      {new Date(meeting.date).toLocaleDateString("pt-BR")} às {meeting.time} - {meeting.organizer}
                    </p>
                  </div>
                  <Badge className={getStatusColor(meeting.status)}>{getStatusText(meeting.status)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
