"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Copy, Eye, EyeOff, Key } from "lucide-react"

interface Client {
  id: string
  name: string
  username: string
  password: string
}

interface ClientCredentialsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: Client | null
}

export function ClientCredentialsDialog({ open, onOpenChange, client }: ClientCredentialsDialogProps) {
  const [showPassword, setShowPassword] = useState(false)

  if (!client) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const copyCredentials = () => {
    const credentials = `Nome de Usuário: ${client.username}\nSenha: ${client.password}`
    copyToClipboard(credentials)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Credenciais do Cliente</span>
          </DialogTitle>
          <DialogDescription>
            Credenciais de acesso para <strong>{client.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de Usuário</Label>
            <div className="flex space-x-2">
              <Input id="username" value={client.username} readOnly className="flex-1" />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(client.username)} className="px-3">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={client.password}
                  readOnly
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
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(client.password)} className="px-3">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Instruções para o Cliente:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Acesse o sistema OKR Tracker</li>
              <li>2. Clique na aba "Cliente"</li>
              <li>3. Use as credenciais acima para fazer login</li>
            </ol>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button onClick={copyCredentials} className="bg-blue-600 hover:bg-blue-700">
            <Copy className="w-4 h-4 mr-2" />
            Copiar Credenciais
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
