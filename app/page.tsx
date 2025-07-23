"use client"

import { useState, useEffect } from "react"
import { LoginScreen } from "@/components/login-screen"
import { AdminDashboard } from "@/components/admin-dashboard"
import { ClientDashboard } from "@/components/client-dashboard"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { user, loading, signOut } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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

  if (user.type === "admin") {
    return <AdminDashboard user={user} onSignOut={signOut} />
  }

  return <ClientDashboard user={user} onSignOut={signOut} />
}
