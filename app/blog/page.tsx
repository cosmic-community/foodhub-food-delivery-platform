import { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/cosmic'
import { Post } from '@/types'

export const metadata: Metadata = {
  title: 'Blog - FoodHub',
  description: 'Food trends, recipes, and restaurant news from FoodHub',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPosts() as Post[]

  // Group posts by category for filtering
  const categories = Array.from(
    new Set(posts.map(post => post.metadata?.category?.value).filter(Boolean))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2000&auto=format,compress)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative container">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              FoodHub Blog
            </h1>
            <p className="text-xl text-white/90">
              Food trends, recipes, delivery tips, and restaurant news delivered fresh to your feed.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mb-12">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/blog"
                    className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    All Posts
                  </Link>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Grid */}
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Check back soon for food trends, recipes, and more!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const imageUrl = post.metadata?.featured_image?.imgix_url
                    ? `${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
                    : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format,compress'

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                    >
                      {/* Featured Image */}
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={post.metadata?.post_title || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        {/* Category Badge */}
                        {post.metadata?.category && (
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              {post.metadata.category.value}
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.metadata?.post_title || post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.metadata?.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {post.metadata.excerpt}
                          </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">
                              {post.metadata?.author_name}
                            </span>
                            {post.metadata?.publish_date && (
                              <>
                                <span>•</span>
                                <time dateTime={post.metadata.publish_date}>
                                  {new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </time>
                              </>
                            )}
                          </div>
                          {post.metadata?.reading_time && (
                            <span>{post.metadata.reading_time} min read</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}