'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Wind, Sun, Droplet, Leaf, BarChart, Shield } from 'lucide-react'
import Footer from '../components/footer'
import SignInButton from '../components/signin'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-['Space_Grotesk',sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      `}</style>
      <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-green-400"
          >
            Greenchain
          </motion.div>
          <motion.ul
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="flex space-x-6"
          >
            {['About', 'Projects', 'Invest', 'DAO'].map((item) => (
              <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <a href="#" className="hover:text-green-300 transition-colors">
                  {item}
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <SignInButton/>
        </nav>
      </header>

      <main>
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(5px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Invest in a <span className="text-green-400">Green</span> Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
              Join the revolution of sustainable blockchain and renewable energy investments
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-green-400 text-green-400 font-semibold text-lg transition-all duration-300 hover:bg-green-400/20"
            >
              Get Started <ChevronRight className="inline-block ml-2" />
            </motion.button>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight className="w-8 h-8 rotate-90" />
          </motion.div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center tracking-wide"
            >
              Powering the Future of Energy
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Wind, title: 'Wind Farms', description: 'Harness the power of wind for sustainable energy production' },
                { icon: Sun, title: 'Solar Parks', description: 'Convert sunlight into clean, renewable electricity' },
                { icon: Droplet, title: 'Hydroelectric', description: 'Generate power from the natural flow of water' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-green-900/20 p-6 rounded-lg backdrop-blur-sm border-solid border-1 green-300"
                >
                  <feature.icon className="w-12 h-12 mb-4 text-green-400" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 font-light">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-green-900/10 backdrop-blur-sm">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center tracking-wide"
            >
              Why Choose Greenchain?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Leaf, title: 'Sustainable', description: '100% solar-powered blockchain' },
                { icon: BarChart, title: 'Profitable', description: 'Fixed ROI ensured by smart contracts' },
                { icon: Shield, title: 'Secure', description: 'DAO voting and blockchain certificates' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <feature.icon className="w-16 h-16 mb-4 mx-auto text-green-400" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 font-light">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer/>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${scrollY % window.innerWidth}px ${scrollY % window.innerHeight}px, rgba(34, 197, 94, 0.15) 0%, transparent 10%)`,
        }}
      />
    </div>
  )
}