import Link from 'next/link'
import { Restaurant } from '@/types'

interface Props {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: Props) {
  const { slug, metadata } = restaurant

  if (!metadata) {
    return null
  }

  const {
    restaurant_name,
    description,
    cuisine_type,
    logo,
    cover_image,
    delivery_time,
    delivery_fee,
    minimum_order,
    rating,
    is_open
  } = metadata

  return (
    <Link href={`/restaurants/${slug}`}>
      <div className="card hover:shadow-md transition-shadow duration-200">
        {cover_image?.imgix_url && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${cover_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={restaurant_name}
              className="w-full h-full object-cover"
            />
            {!is_open && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Closed</span>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {logo?.imgix_url && (
                <img
                  src={`${logo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                  alt={restaurant_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {restaurant_name}
                </h3>
                {cuisine_type?.value && (
                  <span className="text-sm text-gray-500">{cuisine_type.value}</span>
                )}
              </div>
            </div>
            {rating && (
              <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-gray-900">{rating}</span>
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>🚚 {delivery_time}</span>
            <span>${delivery_fee.toFixed(2)} delivery</span>
            {minimum_order && <span>Min ${minimum_order}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}