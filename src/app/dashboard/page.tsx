'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowRight, ArrowUpRight, ArrowDownRight, Leaf, Award, Users, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card"
import { Button } from "@/components/button"
import { Progress } from "@/components/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Mock data for energy production
const energyData = [
  { time: '00:00', energy: 50 },
  { time: '04:00', energy: 30 },
  { time: '08:00', energy: 70 },
  { time: '12:00', energy: 100 },
  { time: '16:00', energy: 80 },
  { time: '20:00', energy: 60 },
  { time: '23:59', energy: 40 },
]

// Mock data for transactions
const initialTransactions = [
  { id: 1, type: 'buy', amount: 100, user: 'Alice', timestamp: new Date().getTime() - 300000 },
  { id: 2, type: 'sell', amount: 50, user: 'Bob', timestamp: new Date().getTime() - 200000 },
  { id: 3, type: 'stake', amount: 200, user: 'Charlie', timestamp: new Date().getTime() - 100000 },
]

// Mock data for user achievements
const userAchievements = [
  { id: 1, name: 'Green Initiate', description: 'Made your first investment', icon: '🌱' },
  { id: 2, name: 'Solar Champion', description: 'Invested in 5 solar projects', icon: '☀️' },
  { id: 3, name: 'Wind Warrior', description: 'Staked 1000 GRNC in wind energy', icon: '🌬️' },
]

export default function DashboardPage() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [totalEnergy, setTotalEnergy] = useState(0)
  const [treesPlanted, setTreesPlanted] = useState(0)
  const [carbonOffset, setCarbonOffset] = useState(0)
  const [communityImpact, setCommunityImpact] = useState(0)
  const globeRef = useRef(null)

  useEffect(() => {
    // Globe visualization setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(300, 300)
    globeRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/earth-texture.jpg'),
      bumpMap: new THREE.TextureLoader().load('/earth-bump.jpg'),
      bumpScale: 0.05,
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(5, 5, 5)
    scene.add(light)

    camera.position.z = 2.5

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false

    const animate = () => {
      requestAnimationFrame(animate)
      globe.rotation.y += 0.005
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Add a new transaction
      const newTransaction = {
        id: transactions.length + 1,
        type: ['buy', 'sell', 'stake'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 500) + 1,
        user: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'][Math.floor(Math.random() * 5)],
        timestamp: new Date().getTime(),
      }
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)])

      // Update total energy
      const energyIncrease = Math.floor(Math.random() * 10)
      setTotalEnergy(prev => prev + energyIncrease)

      // Update trees planted
      if (Math.random() > 0.7) {
        setTreesPlanted(prev => prev + 1)
      }

      // Update carbon offset
      setCarbonOffset(prev => prev + energyIncrease * 0.5)

      // Update community impact
      setCommunityImpact(prev => prev + Math.random() * 2)
    }, 5000)

    return () => {
      clearInterval(interval)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-400">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Energy Produced</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{totalEnergy.toLocaleString()} kWh</div>
            <p className="text-xs text-gray-400">Powering a greener future</p>
          </CardContent>
        </Card>
        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Carbon Offset</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{carbonOffset.toFixed(2)} tons</div>
            <p className="text-xs text-gray-400">CO2 emissions prevented</p>
          </CardContent>
        </Card>
        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Community Impact</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{communityImpact.toFixed(2)}</div>
            <p className="text-xs text-gray-400">Lives improved through clean energy</p>
          </CardContent>
        </Card>
        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">GRNC Price</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">$0.158</div>
            <p className="text-xs text-gray-400">+5.3% in 24h</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader>
            <CardTitle className="text-green-400">Energy Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                  <XAxis dataKey="time" stroke="#A0AEC0" />
                  <YAxis stroke="#A0AEC0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2D3748', border: 'none' }}
                    labelStyle={{ color: '#A0AEC0' }}
                  />
                  <Line type="monotone" dataKey="energy" stroke="#48BB78" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader>
            <CardTitle className="text-green-400">Global Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={globeRef} className="w-[300px] h-[300px] mx-auto" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader>
            <CardTitle className="text-green-400">Real-time Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto space-y-4">
              <AnimatePresence>
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'buy' ? 'bg-green-500' :
                        transaction.type === 'sell' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {transaction.type === 'buy' ? <ArrowUpRight className="w-6 h-6 text-white" /> :
                         transaction.type === 'sell' ? <ArrowDownRight className="w-6 h-6 text-white" /> :
                         <ArrowRight className="w-6 h-6 text-white" />}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{transaction.user}</p>
                        <p className="text-sm text-gray-400">{transaction.type} {transaction.amount} GRNC</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
          <CardHeader>
            <CardTitle className="text-green-400">Energy Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Solar</span>
                <Progress value={45} className="w-2/3" />
                <span className="text-sm text-green-400">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Wind</span>
                <Progress value={30} className="w-2/3" />
                <span className="text-sm text-green-400">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Hydro</span>
                <Progress value={15} className="w-2/3" />
                <span className="text-sm text-green-400">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Biomass</span>
                <Progress value={10} className="w-2/3" />
                <span className="text-sm text-green-400">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
        <CardHeader>
          <CardTitle className="text-green-400">Your Green Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around items-center">
            {userAchievements.map((achievement) => (
              <div key={achievement.id} className="text-center">
                <motion.div 
                  className="text-4xl mb-2"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {achievement.icon}
                </motion.div>
                <p className="text-sm font-bold text-green-400">{achievement.name}</p>
                <p className="text-xs text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black bg-opacity-50 backdrop-blur-md border-green-400/20">
        <CardHeader>
          <CardTitle className="text-green-400">Real-time Carbon Offset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around items-center h-40">
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-green-400 mb-2"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {carbonOffset.toFixed(2)}
              </motion.div>
              <p className="text-sm text-gray-400">Tons of CO2 Offset</p>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-blue-400 mb-2"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {(carbonOffset * 2.7).toFixed(2)}
              </motion.div>
              <p className="text-sm text-gray-400">Trees Equivalent</p>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-yellow-400 mb-2"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                {(carbonOffset * 0.45).toFixed(2)}
              </motion.div>
              <p className="text-sm text-gray-400">Homes Powered for a Year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}