'use client'

import { useState } from 'react'

const cuisineTypes = [
  'All',
  'Italian',
  'Mexican',
  'Chinese',
  'Japanese',
  'American',
  'Indian',
  'Thai'
]

export default function CuisineFilter() {
  const [selectedCuisine, setSelectedCuisine] = useState('All')

  return (
    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
      {cuisineTypes.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => setSelectedCuisine(cuisine)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCuisine === cuisine
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {cuisine}
        </button>
      ))}
    </div>
  )
}