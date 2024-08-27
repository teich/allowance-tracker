'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { PiggyBank, Gift, ShoppingCart, Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import AllowanceCards from '@/components/AllowanceCards'
import TransactionCard from '@/components/TransactionCard'

// Mock data for demonstration
const allowances = {
  giving: { amount: 2, isPercentage: false, total: 50 },
  saving: { amount: 50, isPercentage: true, total: 500 },
  spending: { amount: 5, isPercentage: false, total: 100 }
}

const initialTransactions = [
  { id: 1, category: 'spending', amount: -25, timestamp: '2023-06-01', isAutomatic: false, description: 'Bought a game on Steam' },
  { id: 2, category: 'giving', amount: 2, timestamp: '2023-06-07', isAutomatic: true, description: 'Weekly allowance' },
  { id: 3, category: 'saving', amount: 10, timestamp: '2023-06-07', isAutomatic: true, description: 'Weekly allowance' },
]

const categoryIcons = {
  giving: Gift,
  saving: PiggyBank,
  spending: ShoppingCart,
}

const categoryColors = {
  giving: 'text-purple-600',
  saving: 'text-green-600',
  spending: 'text-blue-600',
}

export default function KidDashboard() {
  const [transactions, setTransactions] = React.useState(initialTransactions)
  const [newTransaction, setNewTransaction] = React.useState({ category: '', amount: '', description: '' })
  const [isFormVisible, setIsFormVisible] = React.useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (value: string) => {
    setNewTransaction({ ...newTransaction, category: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const transaction = {
      id: transactions.length + 1,
      category: newTransaction.category,
      amount: parseFloat(newTransaction.amount),
      timestamp: new Date().toISOString().split('T')[0],
      isAutomatic: false,
      description: newTransaction.description,
    }
    setTransactions([transaction, ...transactions])
    setNewTransaction({ category: '', amount: '', description: '' })
    setIsFormVisible(false)
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Allowance Dashboard</h1>
      
      <AllowanceCards allowances={allowances} />

      <TransactionCard
        transactions={transactions}
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        newTransaction={newTransaction}
        handleCategoryChange={handleCategoryChange}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}