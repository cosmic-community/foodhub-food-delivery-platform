import { getRestaurants } from '@/lib/cosmic'
import { Restaurant } from '@/types'
import RestaurantCard from '@/components/RestaurantCard'
import Hero from '@/components/Hero'
import RestaurantList from '@/components/RestaurantList'

export const revalidate = 60

export default async function HomePage() {
  const restaurants = await getRestaurants() as Restaurant[]

  return (
    <div>
      <Hero />
      
      <RestaurantList restaurants={restaurants} />
    </div>
  )
}