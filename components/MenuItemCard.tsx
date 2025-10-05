import { MenuItem } from '@/types'

interface Props {
  item: MenuItem
}

export default function MenuItemCard({ item }: Props) {
  const { metadata } = item

  if (!metadata) {
    return null
  }

  const {
    item_name,
    description,
    price,
    image,
    dietary_tags,
    available,
    popular
  } = metadata

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      {image?.imgix_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={item_name}
            className="w-full h-full object-cover"
          />
          {popular && (
            <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              Popular
            </div>
          )}
          {!available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Unavailable</span>
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg font-semibold text-gray-900">{item_name}</h4>
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {dietary_tags && dietary_tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dietary_tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}