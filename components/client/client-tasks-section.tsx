"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, CheckSquare } from "lucide-react"

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: string
  createdAt: string
}

interface ClientTasksSectionProps {
  userId: string
}

export function ClientTasksSection({ userId }: ClientTasksSectionProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Revisar relatório mensal",
      description: "Analisar métricas e preparar feedback",
      completed: false,
      priority: "high",
      dueDate: "2024-01-20",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Atualizar dados do sistema",
      completed: true,
      priority: "medium",
      dueDate: "2024-01-15",
      createdAt: "2024-01-08",
    },
    {
      id: "3",
      title: "Preparar apresentação",
      completed: false,
      priority: "low",
      createdAt: "2024-01-12",
    },
  ])

  const [newTaskTitle, setNewTaskTitle] = useState("")

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        priority: "medium",
        createdAt: new Date().toISOString(),
      }
      setTasks([newTask, ...tasks])
      setNewTaskTitle("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return "Indefinida"
    }
  }

  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Minhas Tarefas</h2>
        <p className="text-gray-600">
          {pendingTasks.length} pendentes, {completedTasks.length} concluídas
        </p>
      </div>

      {/* Add New Task */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Nova Tarefa Pessoal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Digite o título da tarefa..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
            />
            <Button onClick={addTask} disabled={!newTaskTitle.trim()} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <span>Tarefas Pendentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{task.title}</h4>
                      <Badge className={getPriorityColor(task.priority)}>{getPriorityText(task.priority)}</Badge>
                    </div>
                    {task.description && <p className="text-xs text-gray-600 mt-1">{task.description}</p>}
                    {task.dueDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Prazo: {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-green-600" />
                <span>Tarefas Concluídas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg opacity-75">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900 line-through truncate">{task.title}</h4>
                      <Badge className={getPriorityColor(task.priority)}>{getPriorityText(task.priority)}</Badge>
                    </div>
                    {task.description && <p className="text-xs text-gray-600 mt-1 line-through">{task.description}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {tasks.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <CheckSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Nenhuma tarefa encontrada</p>
              <p className="text-sm text-gray-400">Adicione uma nova tarefa para começar</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
