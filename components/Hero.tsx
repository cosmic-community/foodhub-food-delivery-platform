export default function Hero() {
  return (
      <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2000&auto=format,compress)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container py-16 md:py-24">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Food delivery from your favorite restaurants
          </h1>
          <p className="text-xl md:text-2xl text-primary-50 mb-8">
            Fast delivery to your door. Order now and satisfy your cravings!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button className="btn-primary whitespace-nowrap">
              Find Restaurants
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}