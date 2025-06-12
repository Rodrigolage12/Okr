"use client"

import { useAuth } from "@/hooks/use-auth"
import { LoginScreen } from "@/components/login-screen"
import { AdminDashboard } from "@/components/admin-dashboard"
import { ClientDashboard } from "@/components/client-dashboard"

export interface User {
  id: string
  name: string
  email: string | null
  username?: string
  type: "admin" | "client"
  companyId?: string
}

export default function Home() {
  const { user, loading, isAuthenticated, error, logout } = useAuth()

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Erro de Autenticação</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("mockUser")
                window.location.reload()
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  // Not authenticated - show login
  if (!isAuthenticated || !user) {
    return <LoginScreen />
  }

  // Authenticated - show appropriate dashboard
  if (user.type === "admin") {
    return <AdminDashboard user={user} onLogout={logout} />
  }

  // Default to client dashboard
  return <ClientDashboard user={user} onLogout={logout} />
}
