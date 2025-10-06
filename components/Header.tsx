'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍔</span>
            <span className="text-xl font-bold text-primary">FoodHub</span>
          </Link>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Restaurants
            </Link>
            <Link 
              href="/orders" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Orders
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>
// components/Header.tsx

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''} md:hidden`}
        >
          <nav className="py-4 space-y-2">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors rounded-lg"
            >
              Restaurants
            </Link>
            <Link 
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors rounded-lg"
            >
              Orders
            </Link>
            <Link 
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors rounded-lg"
            >
              About
            </Link>
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors rounded-lg"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}