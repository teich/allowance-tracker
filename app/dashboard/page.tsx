import { Suspense } from 'react'
import KidDashboard from '../../components/KidDashboard'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export const metadata = {
  title: 'Kid Dashboard | Allowance Tracker',
  description: 'View and manage your allowance and transactions',
}

function LoadingFallback() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Loading Dashboard...</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="h-6 bg-gray-200 rounded animate-pulse"></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="h-8 bg-gray-200 rounded animate-pulse"></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <KidDashboard />
      </Suspense>
    </main>
  )
}