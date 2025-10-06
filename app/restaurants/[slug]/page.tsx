// app/restaurants/[slug]/page.tsx
import { getRestaurant, getMenuItemsByRestaurant, getReviewsByRestaurant } from '@/lib/cosmic'
import { Restaurant, MenuItem, Review } from '@/types'
import RestaurantHeader from '@/components/RestaurantHeader'
import MenuItemCard from '@/components/MenuItemCard'
import ReviewCard from '@/components/ReviewCard'
import ReviewForm from '@/components/ReviewForm'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params
  const restaurant = await getRestaurant(slug) as Restaurant | null

  if (!restaurant) {
    notFound()
  }

  const menuItems = await getMenuItemsByRestaurant(restaurant.id) as MenuItem[]
  const reviews = await getReviewsByRestaurant(restaurant.id) as Review[]

  // Calculate average rating from reviews
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + (review.metadata?.rating || 0), 0) / reviews.length
    : restaurant.metadata.rating || 0

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.metadata?.category?.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} avgRating={avgRating} reviewCount={reviews.length} />

      <div className="container py-12">
        {/* Menu Section */}
        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu items available yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews ({reviews.length})
            </h2>
            {avgRating > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  {avgRating.toFixed(1)}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-2xl">⭐</span>
                </div>
              </div>
            )}
          </div>

          {/* Review Submission Form */}
          <div className="mb-8">
            <ReviewForm restaurantId={restaurant.id} restaurantName={restaurant.metadata.restaurant_name} />
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}