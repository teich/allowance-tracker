import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { categoryIcons, categoryColors } from '@/lib/constants'
import TransactionForm from '@/components/TransactionForm'
import TransactionTable from '@/components/TransactionTable'

interface TransactionCardProps {
  transactions: Array<{
    id: number
    category: string
    amount: number
    timestamp: string
    isAutomatic: boolean
    description: string
  }>
  isFormVisible: boolean
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  newTransaction: { category: string; amount: string; description: string }
  handleCategoryChange: (value: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

export default function TransactionCard({
  transactions,
  isFormVisible,
  setIsFormVisible,
  newTransaction,
  handleCategoryChange,
  handleInputChange,
  handleSubmit
}: TransactionCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Transactions</CardTitle>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-white text-blue-500 rounded-full p-2 hover:bg-blue-100 transition-colors duration-300"
          aria-label={isFormVisible ? "Close new transaction form" : "Open new transaction form"}
        >
          <Plus className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent className="p-4">
        {isFormVisible && (
          <TransactionForm
            newTransaction={newTransaction}
            handleCategoryChange={handleCategoryChange}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        )}
        <TransactionTable transactions={transactions} />
      </CardContent>
    </Card>
  )
}
