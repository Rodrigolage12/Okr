"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus } from "lucide-react"
import { NewEventDialog } from "@/components/new-event-dialog"

interface Event {
  id: string
  title: string
  time: string
  duration: number
  type: "meeting" | "task" | "review"
  description?: string
}

export function AgendaSection() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showNewEventDialog, setShowNewEventDialog] = useState(false)
  const [events, setEvents] = useState<Record<string, Event[]>>({
    "2024-01-15": [
      {
        id: "1",
        title: "Reunião de OKR Review",
        time: "09:00",
        duration: 60,
        type: "meeting",
        description: "Revisão trimestral dos OKRs",
      },
      {
        id: "2",
        title: "Análise de Métricas",
        time: "14:30",
        duration: 30,
        type: "task",
      },
    ],
  })

  // Generate time slots (9:00 to 18:00, every 30 minutes, excluding weekends)
  const generateTimeSlots = () => {
    const slots = []
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6

    if (isWeekend) {
      return [] // No slots for weekends
    }

    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
    return slots
  }

  const getDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const selectedDateKey = getDateKey(selectedDate)
  const dayEvents = events[selectedDateKey] || []
  const timeSlots = generateTimeSlots()

  const getEventAtTime = (time: string) => {
    return dayEvents.find((event) => event.time === time)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800"
      case "task":
        return "bg-green-100 text-green-800"
      case "review":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const addEvent = (newEvent: Omit<Event, "id">, date: Date) => {
    const dateKey = getDateKey(date)
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    }

    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), event],
    }))
  }

  const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agenda</h2>
          <p className="text-gray-600">Gerencie seus compromissos e reuniões</p>
        </div>
        <Button
          onClick={() => setShowNewEventDialog(true)}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isWeekend}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              disabled={(date) => {
                const day = date.getDay()
                return day === 0 || day === 6 // Disable weekends
              }}
            />
            <div className="mt-4 text-sm text-gray-600">
              <p>• Sábados e domingos não funcionamos</p>
              <p>• Feriados também são bloqueados</p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>
                {selectedDate.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isWeekend ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Não funcionamos aos finais de semana</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {timeSlots.map((time) => {
                  const event = getEventAtTime(time)
                  return (
                    <div
                      key={time}
                      className={`flex items-center space-x-3 p-2 rounded-lg border ${
                        event ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className="text-sm font-mono text-gray-600 w-12">{time}</span>
                      {event ? (
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            {event.description && <p className="text-xs text-gray-600">{event.description}</p>}
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>{event.duration}min</Badge>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 flex-1">Disponível</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <NewEventDialog
        open={showNewEventDialog}
        onOpenChange={setShowNewEventDialog}
        onAddEvent={addEvent}
        selectedDate={selectedDate}
        availableSlots={timeSlots.filter((time) => !getEventAtTime(time))}
      />
    </div>
  )
}
