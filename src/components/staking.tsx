'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Info, X, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Slider } from "@/components/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/dialog"

const MIN_STAKE_AMOUNT = 100
const MIN_STAKE_PERIOD = 180 // days
const APY = 8

export default function Staking() {
  const [balance, setBalance] = useState(1000)
  const [stakeAmount, setStakeAmount] = useState(MIN_STAKE_AMOUNT)
  const [stakePeriod, setStakePeriod] = useState(MIN_STAKE_PERIOD)
  const [showStakeSuccess, setShowStakeSuccess] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [solarPanelsCount, setSolarPanelsCount] = useState(0)

  useEffect(() => {
    // Calculate number of solar panels that can be built with the staked amount
    setSolarPanelsCount(Math.floor(stakeAmount / 500)) // Assuming each panel costs 500 GRNC
  }, [stakeAmount])

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault()
    if (stakeAmount >= MIN_STAKE_AMOUNT && stakePeriod >= MIN_STAKE_PERIOD) {
      setBalance(prevBalance => prevBalance - stakeAmount)
      setShowStakeSuccess(true)
      setTimeout(() => setShowStakeSuccess(false), 3000)
    }
  }

  const calculateRewards = () => {
    const annualReward = stakeAmount * (APY / 100)
    const periodReward = (annualReward / 365) * stakePeriod
    return periodReward.toFixed(2)
  }

  return (
    <div className="space-y-6">      
      <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center justify-between">
            Stake Your GRNC
            <Button variant="ghost" size="icon" onClick={() => setShowInfoModal(true)}>
              <Info className="h-5 w-5 text-green-400" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStake} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="stakeAmount" className="text-sm text-gray-400">Stake Amount (GRNC)</label>
              <Input
                id="stakeAmount"
                type="number"
                min={MIN_STAKE_AMOUNT}
                max={balance}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                className="bg-black border-green-400/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="stakePeriod" className="text-sm text-gray-400">Stake Period (Days)</label>
              <Slider
                id="stakePeriod"
                min={MIN_STAKE_PERIOD}
                max={365}
                step={1}
                value={[stakePeriod]}
                onValueChange={(value) => setStakePeriod(value[0])}
                className="py-4"
              />
              <div className="text-right text-sm text-gray-400">{stakePeriod} days</div>
            </div>
            <div className="bg-black p-4 rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span>Estimated Reward:</span>
                <span className="text-green-400 font-bold">{calculateRewards()} GRNC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Solar Panels Funded:</span>
                <span className="text-yellow-400 font-bold">{solarPanelsCount}</span>
              </div>
              <div className="flex justify-center">
                <motion.div 
                  className="w-20 h-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="w-full h-full text-yellow-400" />
                </motion.div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
              Stake GRNC
            </Button>
          </form>
          <AnimatePresence>
            {showStakeSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-2 bg-green-500 text-white rounded-md text-center"
              >
                Staking successful! Your GRNC is now working towards a greener future.
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="bg-gray-900 text-white border-green-400/20">
          <DialogHeader>
            <DialogTitle className="text-green-400">Staking Advantages</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4">
            <p>
              Staking your GRNC tokens offers numerous benefits:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Earn an attractive 8% APY on your staked tokens</li>
              <li>Contribute directly to the construction of solar panels</li>
              <li>Reduce your carbon footprint while earning rewards</li>
              <li>Participate in the growth of renewable energy infrastructure</li>
              <li>Minimum stake: {MIN_STAKE_AMOUNT} GRNC for {MIN_STAKE_PERIOD} days</li>
            </ul>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Zap className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-bold">Your stake powers the future!</span>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}