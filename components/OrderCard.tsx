import { Order } from '@/types'

interface Props {
  order: Order
}

export default function OrderCard({ order }: Props) {
  const { metadata } = order

  if (!metadata) {
    return null
  }

  const {
    order_number,
    customer_name,
    restaurant,
    order_items,
    total_amount,
    order_status,
    order_date,
    estimated_delivery
  } = metadata

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      case 'preparing':
      case 'ready':
      case 'picked-up':
        return 'bg-blue-100 text-blue-700'
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="card p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {order_number}
          </h3>
          <p className="text-gray-600">
            {customer_name} • {new Date(order_date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {order_status?.value && (
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order_status.key)}`}>
              {order_status.value}
            </span>
          )}
        </div>
      </div>

      {restaurant && (
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
          {restaurant.metadata?.logo?.imgix_url && (
            <img
              src={`${restaurant.metadata.logo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
              alt={restaurant.title}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-medium text-gray-900">{restaurant.title}</p>
            <p className="text-sm text-gray-500">{restaurant.metadata?.cuisine_type?.value}</p>
          </div>
        </div>
      )}

      <div className="space-y-2 mb-4">
        {order_items && order_items.length > 0 ? (
          order_items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-900 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No items in this order</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {estimated_delivery && (
            <p>Estimated delivery: {estimated_delivery}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-primary">
            ${total_amount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}