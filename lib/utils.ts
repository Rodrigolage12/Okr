import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function formatDateTime(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function calculateProgress(current: number, target: number) {
  if (target === 0) return 0
  return Math.min(Math.round((current / target) * 100), 100)
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
    case "active":
      return "text-green-600 bg-green-100"
    case "in_progress":
    case "pending":
      return "text-yellow-600 bg-yellow-100"
    case "cancelled":
    case "inactive":
      return "text-red-600 bg-red-100"
    case "draft":
      return "text-gray-600 bg-gray-100"
    default:
      return "text-blue-600 bg-blue-100"
  }
}

export function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case "high":
      return "text-red-600 bg-red-100"
    case "medium":
      return "text-yellow-600 bg-yellow-100"
    case "low":
      return "text-green-600 bg-green-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}
