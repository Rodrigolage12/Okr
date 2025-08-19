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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  // Render dashboard based on user type
  if (user.user_type === "admin") {
    return <AdminDashboard />
  } else {
    return <ClientDashboard />
  }
}
