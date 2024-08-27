import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface TransactionFormProps {
  newTransaction: { category: string; amount: string; description: string }
  handleCategoryChange: (value: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

export default function TransactionForm({
  newTransaction,
  handleCategoryChange,
  handleInputChange,
  handleSubmit
}: TransactionFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded-lg shadow">
      <Select onValueChange={handleCategoryChange} value={newTransaction.category}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="giving">Giving</SelectItem>
          <SelectItem value="saving">Saving</SelectItem>
          <SelectItem value="spending">Spending</SelectItem>
        </SelectContent>
      </Select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={newTransaction.amount}
        onChange={handleInputChange}
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newTransaction.description}
        onChange={handleInputChange}
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <button type="submit" className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded hover:from-blue-600 hover:to-purple-600 transition-all duration-300">Add Transaction</button>
    </form>
  )
}
