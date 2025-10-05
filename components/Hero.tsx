export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
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