'use client'

import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

export default function SignInButton() {
  return (
    <Link href="/signin">
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center px-4 py-2 bg-transparent border-2 border-green-400 text-green-400 font-semibold text-sm transition-all duration-300 hover:bg-green-400/20"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </motion.button>
    </Link>
  )
}