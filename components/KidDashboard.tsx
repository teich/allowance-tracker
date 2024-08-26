'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { PiggyBank, Gift, ShoppingCart } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

// Mock data for demonstration
const allowances = {
  giving: { amount: 2, isPercentage: false, total: 50 },
  saving: { amount: 50, isPercentage: true, total: 500 },
  spending: { amount: 5, isPercentage: false, total: 100 }
}

const transactions = [
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
  const [newTransaction, setNewTransaction] = React.useState({ category: '', amount: '', description: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (value: string) => {
    setNewTransaction({ ...newTransaction, category: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('New transaction:', newTransaction)
    // Reset the form
    setNewTransaction({ category: '', amount: '', description: '' })
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Allowance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(allowances).map(([category, { amount, isPercentage, total }]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons]
          return (
            <Card key={category} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className={`flex flex-row items-center justify-between ${categoryColors[category as keyof typeof categoryColors]} bg-opacity-10 p-4`}>
                <CardTitle className="capitalize text-lg font-semibold">{category}</CardTitle>
                <Icon className={`h-6 w-6 ${categoryColors[category as keyof typeof categoryColors]}`} />
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-3xl font-bold text-gray-700">${total.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {isPercentage ? `${amount}% / year` : `$${amount} / week`}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mb-8 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
          <CardTitle className="text-xl">Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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
        </CardContent>
      </Card>

      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4">
          <CardTitle className="text-xl">Transaction Log</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-2 text-gray-600">Date</th>
                  <th className="text-left p-2 text-gray-600">Category</th>
                  <th className="text-left p-2 text-gray-600">Amount</th>
                  <th className="text-left p-2 text-gray-600">Description</th>
                  <th className="text-left p-2 text-gray-600">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const Icon = categoryIcons[transaction.category as keyof typeof categoryIcons]
                  return (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300">
                      <td className="p-2 text-gray-800">{transaction.timestamp}</td>
                      <td className="p-2 capitalize flex items-center">
                        <Icon className={`h-4 w-4 mr-2 ${categoryColors[transaction.category as keyof typeof categoryColors]}`} />
                        <span className="text-gray-800">{transaction.category}</span>
                      </td>
                      <td className={`p-2 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </td>
                      <td className="p-2 text-gray-800">{transaction.description}</td>
                      <td className="p-2 text-gray-600">{transaction.isAutomatic ? 'Automatic' : 'Manual'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}