// app/restaurants/[slug]/page.tsx
import { getRestaurant, getMenuItemsByRestaurant } from '@/lib/cosmic'
import { Restaurant, MenuItem } from '@/types'
import RestaurantHeader from '@/components/RestaurantHeader'
import MenuItemCard from '@/components/MenuItemCard'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params
  const restaurant = await getRestaurant(slug) as Restaurant | null

  if (!restaurant) {
    notFound()
  }

  const menuItems = await getMenuItemsByRestaurant(restaurant.id) as MenuItem[]

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.metadata?.category?.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  const categoryOrder = ['Appetizers', 'Main Courses', 'Sides', 'Desserts', 'Drinks', 'Other']

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />

      <div className="container py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Menu</h2>

        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu items available.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categoryOrder
              .filter(categoryKey => {
                const items = groupedItems[categoryKey]
                return items && items.length > 0
              })
              .map((categoryKey) => {
                const items = groupedItems[categoryKey]
                
                if (!items || items.length === 0) {
                  return null
                }
                
                return (
                  <div key={categoryKey}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {categoryKey}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}