"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for demonstration
const allowances = {
  giving: { amount: 2, isPercentage: false },
  saving: { amount: 50, isPercentage: true },
  spending: { amount: 5, isPercentage: false }
};

const transactions = [
  { id: 1, category: 'spending', amount: -25, timestamp: '2023-06-01', isAutomatic: false, description: 'Bought a game on Steam' },
  { id: 2, category: 'giving', amount: 2, timestamp: '2023-06-07', isAutomatic: true, description: 'Weekly allowance' },
  { id: 3, category: 'saving', amount: 10, timestamp: '2023-06-07', isAutomatic: true, description: 'Weekly allowance' },
];

export default function Component() {
  const [newTransaction, setNewTransaction] = React.useState({ category: '', amount: '', description: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setNewTransaction({ ...newTransaction, category: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('New transaction:', newTransaction);
    // Reset the form
    setNewTransaction({ category: '', amount: '', description: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Allowance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(allowances).map(([category, { amount, isPercentage }]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="capitalize">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isPercentage ? `${amount}% / year` : `$${amount} / week`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select onValueChange={handleCategoryChange} value={newTransaction.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="giving">Giving</SelectItem>
                <SelectItem value="saving">Saving</SelectItem>
                <SelectItem value="spending">Spending</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={newTransaction.description}
              onChange={handleInputChange}
            />
            <Button type="submit">Add Transaction</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.timestamp}</TableCell>
                  <TableCell className="capitalize">{transaction.category}</TableCell>
                  <TableCell>${Math.abs(transaction.amount).toFixed(2)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.isAutomatic ? 'Automatic' : 'Manual'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}