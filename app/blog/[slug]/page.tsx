// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    return {
      title: 'Post Not Found - FoodHub',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.metadata?.post_title || post.title} - FoodHub Blog`,
    description: post.metadata?.excerpt || 'Read this article on FoodHub Blog'
  }
}

export async function generateStaticParams() {
  const posts = await getPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export const revalidate = 60

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    notFound()
  }

  const imageUrl = post.metadata?.featured_image?.imgix_url
    ? `${post.metadata.featured_image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2000&h=1000&fit=crop&auto=format,compress'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={imageUrl}
          alt={post.metadata?.post_title || post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <div className="max-w-4xl">
              {post.metadata?.category && (
                <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-4">
                  {post.metadata.category.value}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {post.metadata?.post_title || post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Written by</div>
                  <div className="font-medium text-gray-900">{post.metadata?.author_name}</div>
                </div>
              </div>

              {post.metadata?.publish_date && (
                <>
                  <span className="text-gray-300">•</span>
                  <div>
                    <div className="text-sm text-gray-500">Published</div>
                    <time dateTime={post.metadata.publish_date} className="font-medium text-gray-900">
                      {new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </>
              )}

              {post.metadata?.reading_time && (
                <>
                  <span className="text-gray-300">•</span>
                  <div>
                    <div className="text-sm text-gray-500">Reading time</div>
                    <div className="font-medium text-gray-900">{post.metadata.reading_time} min read</div>
                  </div>
                </>
              )}
            </div>

            {/* Excerpt */}
            {post.metadata?.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-gray-100 rounded-lg border-l-4 border-primary">
                {post.metadata.excerpt}
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
            />

            {/* Author Bio / Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    About {post.metadata?.author_name}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Thanks for reading! Explore more food trends, recipes, and delivery tips on the FoodHub blog.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    View all posts
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}