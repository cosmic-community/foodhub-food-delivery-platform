'use server'

import { cosmic } from '@/lib/cosmic'
import { revalidatePath } from 'next/cache'

interface SubmitReviewData {
  restaurantId: string
  reviewer_name: string
  reviewer_email: string
  rating: number
  comment: string
}

export async function submitReview(data: SubmitReviewData) {
  try {
    // Validate input
    if (!data.restaurantId || !data.reviewer_name || !data.reviewer_email || !data.comment) {
      return { success: false, error: 'All fields are required' }
    }

    if (data.rating < 1 || data.rating > 5) {
      return { success: false, error: 'Rating must be between 1 and 5' }
    }

    // Create a slug from reviewer name and timestamp
    const timestamp = Date.now()
    const slug = `${data.reviewer_name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`

    // Get current date in YYYY-MM-DD format
    const reviewDate = new Date().toISOString().split('T')[0]

    // Create the review object in Cosmic
    await cosmic.objects.insertOne({
      title: `${data.reviewer_name}'s review`,
      type: 'reviews',
      slug,
      metadata: {
        restaurant: data.restaurantId,
        reviewer_name: data.reviewer_name,
        reviewer_email: data.reviewer_email,
        rating: data.rating,
        comment: data.comment,
        review_date: reviewDate,
        verified_purchase: false
      }
    })

    // Revalidate the restaurant page to show the new review
    revalidatePath('/restaurants/[slug]', 'page')

    return { success: true }
  } catch (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: 'Failed to submit review. Please try again.' }
  }
}