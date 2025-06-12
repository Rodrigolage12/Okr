import { useClients, useOKRs, useReports } from "@/hooks/use-supabase-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const AdminDashboard = () => {
  // Replace the useState with real data hooks
  const { clients, loading: clientsLoading } = useClients()
  const { okrs, loading: okrsLoading } = useOKRs()
  const { reports, loading: reportsLoading } = useReports()

  const loading = clientsLoading || okrsLoading || reportsLoading

  // Update the stats calculations to use real data:
  const totalClients = clients.length
  const totalOKRs = okrs.length
  const totalReports = reports.length
  const activeOKRs = okrs.filter((okr) => okr.status === "active").length

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Clients</CardTitle>
            <CardDescription>All registered clients</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-5 w-20" /> : <div className="text-2xl font-bold">{totalClients}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total OKRs</CardTitle>
            <CardDescription>All created OKRs</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-5 w-20" /> : <div className="text-2xl font-bold">{totalOKRs}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active OKRs</CardTitle>
            <CardDescription>Currently active OKRs</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-5 w-20" /> : <div className="text-2xl font-bold">{activeOKRs}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Reports</CardTitle>
            <CardDescription>All submitted reports</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-5 w-20" /> : <div className="text-2xl font-bold">{totalReports}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
