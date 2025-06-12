"use client"

import { useAuth } from "@/hooks/use-auth"
import { LoginScreen } from "@/components/login-screen"
import { AdminDashboard } from "@/components/admin-dashboard"
import { ClientDashboard } from "@/components/client-dashboard"

export default function Home() {
  const { user, loading, isAuthenticated, error } = useAuth()

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Recarregue a página para tentar novamente</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {user.type === "admin" ? (
        <AdminDashboard user={user} onLogout={() => {}} />
      ) : (
        <ClientDashboard user={user} onLogout={() => {}} />
      )}
    </div>
  )
}
