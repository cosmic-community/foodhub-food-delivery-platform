'use client'

interface Props {
  selectedCuisine: string
  onCuisineChange: (cuisine: string) => void
}

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

export default function CuisineFilter({ selectedCuisine, onCuisineChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
      {cuisineTypes.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => onCuisineChange(cuisine)}
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