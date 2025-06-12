"use client"

import type React from "react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import { useClients } from "@/hooks/use-supabase-data"

const ClientManagementSection = () => {
  const [showNewClientDialog, setShowNewClientDialog] = useState(false)
  const [newClientData, setNewClientData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const { clients, loading, error, addClient, editClient, removeClient } = useClients()

  const handleOpenNewClientDialog = () => {
    setShowNewClientDialog(true)
  }

  const handleCloseNewClientDialog = () => {
    setShowNewClientDialog(false)
    setNewClientData({ name: "", email: "", phone: "" })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewClientData({
      ...newClientData,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddClient = async (clientData: any) => {
    try {
      await addClient(clientData)
      setShowNewClientDialog(false)
    } catch (error) {
      console.error("Error adding client:", error)
    }
  }

  const handleSubmitNewClient = () => {
    handleAddClient(newClientData)
  }

  const handleDeleteClient = async (id: string) => {
    try {
      await removeClient(id)
    } catch (error) {
      console.error("Error deleting client:", error)
    }
  }

  if (loading) {
    return <div>Loading clients...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>Client Management</h2>
      <Button variant="contained" color="primary" onClick={handleOpenNewClientDialog}>
        Add New Client
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((client: any) => (
              <TableRow key={client.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteClient(client.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showNewClientDialog} onClose={handleCloseNewClientDialog}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newClientData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={newClientData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={newClientData.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewClientDialog}>Cancel</Button>
          <Button onClick={handleSubmitNewClient}>Add Client</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ClientManagementSection
