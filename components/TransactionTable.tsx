import React from 'react'
import { categoryIcons, categoryColors } from '@/lib/constants'

interface TransactionTableProps {
  transactions: Array<{
    id: number
    category: string
    amount: number
    timestamp: string
    isAutomatic: boolean
    description: string
  }>
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
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
  )
}
