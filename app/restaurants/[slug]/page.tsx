// app/restaurants/[slug]/page.tsx
import { getRestaurant, getMenuItemsByRestaurant, getReviewsByRestaurant } from '@/lib/cosmic'
import { Restaurant, MenuItem, Review } from '@/types'
import RestaurantHeader from '@/components/RestaurantHeader'
import MenuItemCard from '@/components/MenuItemCard'
import ReviewCard from '@/components/ReviewCard'
import { notFound } from 'next/navigation'
// app/restaurants/[slug]/page.tsx
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
// app/restaurants/[slug]/page.tsx
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} avgRating={avgRating} reviewCount={reviews.length} />

      <div className="container py-12">
// app/restaurants/[slug]/page.tsx
              })}
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