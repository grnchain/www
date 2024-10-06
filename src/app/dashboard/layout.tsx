'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, BarChart2, Wallet, Settings, LogOut, Menu, X } from 'lucide-react'
import { Button } from "@/components/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSignOut = async () => {
    // Implement your sign out logic here
    router.push('/signin')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="h-screen flex bg-black text-white font-['Space_Grotesk',sans-serif] relative overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/014/420/123/non_2x/green-energy-concept-green-technology-background-futuristic-illustration-vector.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(50px)',
          opacity: 0.6,
        }}
      ></div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black bg-opacity-50 backdrop-blur-md transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold text-green-400">Greenchain</h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-green-400 hover:text-green-300 hover:bg-green-400/10"
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-green-400/10">
                  <Home className="mr-3 h-5 w-5 text-green-400" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/marketplace" className="flex items-center p-2 rounded-lg hover:bg-green-400/10">
                  <BarChart2 className="mr-3 h-5 w-5 text-green-400" />
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard/wallet" className="flex items-center p-2 rounded-lg hover:bg-green-400/10">
                  <Wallet className="mr-3 h-5 w-5 text-green-400" />
                  Wallet
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="flex items-center p-2 rounded-lg hover:bg-green-400/10">
                  <Settings className="mr-3 h-5 w-5 text-green-400" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 text-green-400 hover:text-green-300 hover:bg-green-400/10 lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header> */}
        <main className="flex-1 overflow-y-auto p-4  pt-12"> 
        {/* bg-black bg-opacity-50 backdrop-blur-sm */}
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  )
}