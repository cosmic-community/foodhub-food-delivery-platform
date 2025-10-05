import { getOrders } from '@/lib/cosmic'
import { Order } from '@/types'
import OrderCard from '@/components/OrderCard'

export const revalidate = 60

export default async function OrdersPage() {
  const orders = await getOrders() as Order[]

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Recent Orders</h1>

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
  )
}