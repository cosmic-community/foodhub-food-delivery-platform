import { Review } from '@/types'

interface Props {
  review: Review
}

export default function ReviewCard({ review }: Props) {
  const { metadata } = review

  if (!metadata) {
    return null
  }

  const {
    reviewer_name,
    rating,
    comment,
    review_date,
    verified_purchase
  } = metadata

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < rating
      return (
        <span
          key={index}
          className={`text-xl ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          ⭐
        </span>
      )
    })
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
              {reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{reviewer_name}</h4>
              {verified_purchase && (
                <span className="text-xs text-green-600 flex items-center space-x-1">
                  <span>✓</span>
                  <span>Verified Purchase</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            {renderStars(rating)}
          </div>
          <p className="text-sm text-gray-500">{formatDate(review_date)}</p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{comment}</p>
    </div>
  )
}