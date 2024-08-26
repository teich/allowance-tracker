import AllowanceForm from '../components/AllowanceForm'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-center mb-8">
        Allowance Tracker
      </h1>
      <AllowanceForm />
    </main>
  )
}