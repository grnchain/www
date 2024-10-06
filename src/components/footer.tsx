import { useState } from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log('Signed up with email:', email)
    setEmail('')
  }

  return (
    <footer className="bg-black text-white font-['Space_Grotesk',sans-serif] py-12 border-t border-green-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400">Greenchain</h3>
            <p className="text-sm text-gray-300">
              Empowering a sustainable future through blockchain technology and renewable energy investments.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Invest', 'DAO', 'Whitepaper'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-green-900/20 text-white px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-400 text-black px-4 py-2 hover:bg-green-300 transition-colors"
                >
                  <Send size={20} />
                </motion.button>
              </div>
              <p className="text-xs text-gray-400">
                Subscribe to stay updated with our latest news and offers.
              </p>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-800 text-center text-sm text-gray-400">
          <p>&copy; 2024 Greenchain. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            {' | '}
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  )
}