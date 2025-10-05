import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍔</span>
            <span className="text-xl font-bold text-primary">FoodHub</span>
          </Link>

          <nav className="flex items-center space-x-8">
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
          </nav>
        </div>
      </div>
    </header>
  )
}