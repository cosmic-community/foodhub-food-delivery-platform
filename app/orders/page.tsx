import { getOrders } from '@/lib/cosmic'
import { Order } from '@/types'
import OrderCard from '@/components/OrderCard'

export const revalidate = 60

export default async function OrdersPage() {
  const orders = await getOrders() as Order[]

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-12 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1526367790999-0150786686a2?w=2000&auto=format,compress)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative container">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Recent Orders</h1>
          </div>
        </div>
        <div className="container py-12">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
  )
}