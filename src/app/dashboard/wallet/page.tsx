'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpDown, Leaf, Zap, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Staking from '@/components/staking'

const mockPriceData = [
  { date: '2023-01', price: 0.08 },
  { date: '2023-02', price: 0.085 },
  { date: '2023-03', price: 0.09 },
  { date: '2023-04', price: 0.095 },
  { date: '2023-05', price: 0.1 },
  { date: '2023-06', price: 0.105 },
]

const mockTransactions = [
  { id: 1, type: 'Buy', amount: 100, date: '2023-06-01', status: 'Completed' },
  { id: 2, type: 'Invest', amount: 50, date: '2023-06-05', status: 'Pending' },
  { id: 3, type: 'Sell', amount: 25, date: '2023-06-10', status: 'Completed' },
]

export default function WalletPage() {
  const [balance, setBalance] = useState(1000)
  const [exchangeAmount, setExchangeAmount] = useState('')
  const [exchangeCurrency, setExchangeCurrency] = useState('USD')
  const [showExchangeSuccess, setShowExchangeSuccess] = useState(false)
  const exchangeRates = {
    USD: 10, // 1 USD = 10 GRNC
    EUR: 11, // 1 EUR = 11 GRNC
    GBP: 13, // 1 GBP = 13 GRNC
    JPY: 0.09 // 1 JPY = 0.09 GRNC
  }
    const [convertedAmount, setConvertedAmount] = useState(0)
  
    useEffect(() => {
      const amount = parseFloat(exchangeAmount) || 0
      const rate = exchangeRates[exchangeCurrency] || 1
      setConvertedAmount(amount * rate)
    }, [exchangeAmount, exchangeCurrency])
  
    const handleExchange = (e: React.FormEvent) => {
      e.preventDefault()
      const amount = parseFloat(exchangeAmount)
      if (amount > 0) {
        setBalance(prevBalance => prevBalance + convertedAmount)
        setExchangeAmount('')
        setShowExchangeSuccess(true)
        setTimeout(() => setShowExchangeSuccess(false), 3000)
      }
    }

  // useEffect(() => {
  //   if (showExchangeSuccess) {
  //     const timer = setTimeout(() => setShowExchangeSuccess(false), 3000)
  //     return () => clearTimeout(timer)
  //   }
  // }, [showExchangeSuccess])

  // const handleExchange = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const amount = Number(exchangeAmount)
  //   if (amount > 0) {
  //     setBalance(prevBalance => prevBalance + amount)
  //     setExchangeAmount('')
  //     setShowExchangeSuccess(true)
  //   }
  // }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Wallet</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GRNC Balance</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance.toFixed(2)} GRNC</div>
            <p className="text-xs text-gray-500">≈ ${(balance * 0.1).toFixed(2)} USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(balance * 0.5).toFixed(2)} kg</div>
            <p className="text-xs text-gray-500">CO2 equivalent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GRNC Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.10 USD</div>
            <p className="text-xs text-green-500">+5.23% (24h)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-500">Invested in</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
        <CardHeader>
          <CardTitle className="text-green-400">Exchange to GRNC</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleExchange} className="space-y-4">
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="Amount"
                value={exchangeAmount}
                onChange={(e) => setExchangeAmount(e.target.value)}
                className="flex-grow bg-black border-green-400/20 text-white placeholder-gray-400"
              />
              <Select value={exchangeCurrency} onValueChange={setExchangeCurrency}>
                <SelectTrigger className="w-[180px] bg-black border-green-400/20 text-white">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="bg-black border-green-400/20 text-white">
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Conversion Rate:</span>
              <span>1 {exchangeCurrency} = {exchangeRates[exchangeCurrency]} GRNC</span>
            </div>
            <div className="flex items-center justify-between bg-black p-3 rounded-md">
              <span className="text-white">You will receive:</span>
              <span className="text-2xl font-bold text-green-400">{convertedAmount.toFixed(2)} GRNC</span>
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
              <ArrowUpDown className="mr-2 h-4 w-4" /> Exchange to GRNC
            </Button>
          </form>
          <AnimatePresence>
            {showExchangeSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-2 bg-green-500 text-white rounded-md text-center"
              >
                Exchange successful!
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

        <Card>
          <CardHeader>
            <CardTitle>GRNC Impact Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-black rounded-lg overflow-hidden relative">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-400 to-blue-500"
                style={{
                  height: `${(balance / 2000) * 100}%`,
                }}
                initial={{ height: '0%' }}
                animate={{ height: `${(balance / 2000) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white drop-shadow-lg">
                  {((balance / 2000) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-center mt-4 text-sm text-gray-400">
              Your GRNC balance represents {((balance / 2000) * 100).toFixed(2)}% of your potential environmental impact
            </p>
          </CardContent>
        </Card>
      </div>
      <Staking/>
      <Card>
        <CardHeader>
          <CardTitle>GRNC Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPriceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#4ade80" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
              <TabsTrigger value="invest">Invest</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ul className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <li key={transaction.id} className="flex items-center justify-between p-4 bg-black rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'Buy' ? 'bg-green-500' :
                        transaction.type === 'Sell' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {transaction.type === 'Buy' ? '+' : transaction.type === 'Sell' ? '-' : <ArrowRight />}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{transaction.type} GRNC</p>
                        <p className="text-sm text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{transaction.amount} GRNC</p>
                      <p className={`text-sm ${
                        transaction.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>{transaction.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            {/* Implement other tab contents similarly */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}