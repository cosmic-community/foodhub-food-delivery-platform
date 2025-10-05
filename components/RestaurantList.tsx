'use client'

import { useState } from 'react'
import { Restaurant } from '@/types'
import RestaurantCard from '@/components/RestaurantCard'
import CuisineFilter from '@/components/CuisineFilter'

interface Props {
  restaurants: Restaurant[]
}

export default function RestaurantList({ restaurants }: Props) {
  const [selectedCuisine, setSelectedCuisine] = useState('All')

  // Filter restaurants based on selected cuisine
  const filteredRestaurants = selectedCuisine === 'All' 
    ? restaurants 
    : restaurants.filter(restaurant => {
        const cuisineValue = restaurant.metadata?.cuisine_type?.value
        return cuisineValue && cuisineValue.toLowerCase() === selectedCuisine.toLowerCase()
      })

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCuisine === 'All' ? 'All Restaurants' : `${selectedCuisine} Restaurants`}
          </h2>
          <p className="text-gray-600">
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        <CuisineFilter 
          selectedCuisine={selectedCuisine}
          onCuisineChange={setSelectedCuisine}
        />
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {selectedCuisine === 'All' 
              ? 'No restaurants available at the moment.' 
              : `No ${selectedCuisine} restaurants available at the moment.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}