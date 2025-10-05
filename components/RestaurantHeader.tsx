import { Restaurant } from '@/types'

interface Props {
  restaurant: Restaurant
}

export default function RestaurantHeader({ restaurant }: Props) {
  const { metadata } = restaurant

  if (!metadata) {
    return null
  }

  const {
    restaurant_name,
    description,
    cuisine_type,
    cover_image,
    address,
    phone,
    delivery_time,
    delivery_fee,
    minimum_order,
    rating,
    is_open
  } = metadata

  return (
    <div className="bg-white border-b border-gray-200">
      {cover_image?.imgix_url && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={`${cover_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={restaurant_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {restaurant_name}
              </h1>
              {rating && (
                <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-gray-900">{rating}</span>
                </div>
              )}
            </div>

            {cuisine_type?.value && (
              <p className="text-gray-600 text-lg mb-3">{cuisine_type.value} Cuisine</p>
            )}

            <p className="text-gray-700 max-w-2xl mb-4">{description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>{address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>{phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:min-w-[280px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-semibold ${is_open ? 'text-green-600' : 'text-red-600'}`}>
                  {is_open ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Time</span>
                <span className="font-semibold text-gray-900">{delivery_time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-gray-900">${delivery_fee.toFixed(2)}</span>
              </div>
              {minimum_order && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Minimum Order</span>
                  <span className="font-semibold text-gray-900">${minimum_order.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}