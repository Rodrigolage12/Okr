"use client"

import { useAuth } from "@/hooks/use-auth"
import { LoginScreen } from "@/components/login-screen"
import { AdminDashboard } from "@/components/admin-dashboard"
import { ClientDashboard } from "@/components/client-dashboard"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  // Determine user type from metadata
  const userType = user.user_metadata?.type || "client"

  if (userType === "admin") {
    return <AdminDashboard />
  }

  return <ClientDashboard />
}
