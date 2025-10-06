'use client'

import { useState } from 'react'
import { submitReview } from '@/lib/actions'

interface Props {
  restaurantId: string
  restaurantName: string
}

export default function ReviewForm({ restaurantId, restaurantName }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    reviewer_name: '',
    reviewer_email: '',
    rating: 5,
    comment: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await submitReview({
        restaurantId,
        ...formData
      })

      if (result.success) {
        setMessage({ type: 'success', text: 'Thank you! Your review has been submitted successfully.' })
        setFormData({
          reviewer_name: '',
          reviewer_email: '',
          rating: 5,
          comment: ''
        })
        setTimeout(() => {
          setIsOpen(false)
          setMessage(null)
        }, 2000)
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit review. Please try again.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < rating
      return (
        <button
          key={index}
          type="button"
          onClick={() => setFormData({ ...formData, rating: index + 1 })}
          className={`text-3xl transition-colors ${filled ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400`}
        >
          ⭐
        </button>
      )
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Write a Review
      </button>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Write a Review for {restaurantName}</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reviewer_name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="reviewer_name"
            required
            value={formData.reviewer_name}
            onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="reviewer_email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email *
          </label>
          <input
            type="email"
            id="reviewer_email"
            required
            value={formData.reviewer_email}
            onChange={(e) => setFormData({ ...formData, reviewer_email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating *
          </label>
          <div className="flex items-center space-x-1">
            {renderStars(formData.rating)}
            <span className="ml-3 text-gray-600">({formData.rating} star{formData.rating !== 1 ? 's' : ''})</span>
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            id="comment"
            required
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Tell us about your experience..."
          />
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-800 px-6 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}