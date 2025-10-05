import { getRestaurants } from '@/lib/cosmic'
import { Restaurant } from '@/types'
import RestaurantCard from '@/components/RestaurantCard'
import Hero from '@/components/Hero'
import CuisineFilter from '@/components/CuisineFilter'

export const revalidate = 60

export default async function HomePage() {
  const restaurants = await getRestaurants() as Restaurant[]

  return (
    <div>
      <Hero />
      
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              All Restaurants
            </h2>
            <p className="text-gray-600">
              {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} available
            </p>
          </div>
          
          <CuisineFilter />
        </div>

        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}