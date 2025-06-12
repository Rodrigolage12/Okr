"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, Building, User, Eye, EyeOff, CheckCircle } from "lucide-react"
import { signIn } from "@/lib/supabase-auth"
import { useRouter } from "next/navigation"

// Mock user data for development
const MOCK_USERS = {
  "rodrigocastrolage@gmail.com": {
    id: "mock-admin-1",
    email: "rodrigocastrolage@gmail.com",
    name: "Rodrigo Castro",
    type: "admin",
  },
  "cliente_teste@client.local": {
    id: "mock-client-1",
    email: "cliente_teste@client.local",
    name: "Cliente Teste",
    username: "cliente_teste",
    type: "client",
  },
}

// Mock auth state for development
const mockAuthState = {
  user: null,
  setUser: (user: any) => {
    mockAuthState.user = user
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("mockUser", JSON.stringify(user))
      } else {
        localStorage.removeItem("mockUser")
      }
    }
  },
  getUser: () => {
    if (typeof window !== "undefined" && !mockAuthState.user) {
      const savedUser = localStorage.getItem("mockUser")
      if (savedUser) {
        try {
          mockAuthState.user = JSON.parse(savedUser)
        } catch (e) {
          console.error("Error parsing saved user:", e)
        }
      }
    }
    return mockAuthState.user
  },
}

export function LoginScreen() {
  const [adminEmail, setAdminEmail] = useState("rodrigocastrolage@gmail.com")
  const [adminPassword, setAdminPassword] = useState("123456")
  const [clientUsername, setClientUsername] = useState("cliente_teste")
  const [clientPassword, setClientPassword] = useState("123456")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState<"admin" | "client">("admin")
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const user = mockAuthState.getUser()
    if (user) {
      console.log("User already logged in:", user)
      setTimeout(() => {
        router.push("/")
      }, 1000)
    }
  }, [router])

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // For development, use mock authentication
      if (adminEmail === "rodrigocastrolage@gmail.com" && adminPassword === "123456") {
        const mockUser = {
          ...MOCK_USERS["rodrigocastrolage@gmail.com"],
          user_metadata: {
            name: "Rodrigo Castro",
            type: "admin",
          },
        }
        mockAuthState.setUser(mockUser)
        setSuccess("Login realizado com sucesso!")

        setTimeout(() => {
          router.push("/")
        }, 1000)
        return
      }

      // Try regular authentication
      const user = await signIn(adminEmail, adminPassword)
      mockAuthState.setUser(user)
      setSuccess("Login realizado com sucesso!")

      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error: any) {
      console.error("Admin login error:", error)
      setError(error.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // For development, use mock authentication
      if (clientUsername === "cliente_teste" && clientPassword === "123456") {
        const mockUser = {
          ...MOCK_USERS["cliente_teste@client.local"],
          user_metadata: {
            name: "Cliente Teste",
            username: "cliente_teste",
            type: "client",
          },
        }
        mockAuthState.setUser(mockUser)
        setSuccess("Login realizado com sucesso!")

        setTimeout(() => {
          router.push("/")
        }, 1000)
        return
      }

      // For any other client, create dynamic mock user
      if (clientPassword === "123456") {
        const mockUser = {
          id: `mock-client-${clientUsername}`,
          email: `${clientUsername}@client.local`,
          name: clientUsername.replace("_", " "),
          username: clientUsername,
          type: "client",
          user_metadata: {
            name: clientUsername.replace("_", " "),
            username: clientUsername,
            type: "client",
          },
        }
        mockAuthState.setUser(mockUser)
        setSuccess("Login realizado com sucesso!")

        setTimeout(() => {
          router.push("/")
        }, 1000)
        return
      }

      // Try regular authentication
      const clientEmail = `${clientUsername}@client.local`
      const user = await signIn(clientEmail, clientPassword)
      mockAuthState.setUser(user)
      setSuccess("Login realizado com sucesso!")

      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error: any) {
      console.error("Client login error:", error)
      setError(error.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">OKR Tracker</CardTitle>
          <CardDescription className="text-gray-600">Sistema de gestão de OKRs e clientes</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Development Mode Notice */}
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Modo Desenvolvimento:</strong> Sistema funcionando com autenticação local
            </AlertDescription>
          </Alert>

          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "admin" | "client")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>Empresa</span>
              </TabsTrigger>
              <TabsTrigger value="client" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Cliente</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin" className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-4">
                <p>Acesso administrativo para gerenciar todo o sistema</p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@empresa.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar como Empresa"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="client" className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-4">
                <p>Use as credenciais fornecidas pela empresa</p>
              </div>
              <form onSubmit={handleClientLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-username">Nome de Usuário</Label>
                  <Input
                    id="client-username"
                    type="text"
                    placeholder="seu_usuario"
                    value={clientUsername}
                    onChange={(e) => setClientUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="client-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={clientPassword}
                      onChange={(e) => setClientPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar como Cliente"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2">✅ Credenciais funcionando:</p>
            <div className="space-y-1 text-xs bg-gray-50 p-3 rounded-lg">
              <p>
                <strong>Admin:</strong> rodrigocastrolage@gmail.com
              </p>
              <p>
                <strong>Cliente:</strong> cliente_teste
              </p>
              <p>
                <strong>Senha:</strong> 123456 (para ambos)
              </p>
            </div>
            <p className="mt-2 text-xs text-green-600">Sistema pronto para uso!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
