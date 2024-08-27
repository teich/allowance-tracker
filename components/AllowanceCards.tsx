import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { categoryIcons, categoryColors } from '@/lib/constants'

interface AllowanceCardsProps {
  allowances: {
    [key: string]: { amount: number; isPercentage: boolean; total: number }
  }
}

export default function AllowanceCards({ allowances }: AllowanceCardsProps) {
  return (
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
  )
}
