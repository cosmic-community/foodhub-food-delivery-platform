import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all restaurants
export async function getRestaurants() {
  try {
    const response = await cosmic.objects
      .find({ type: 'restaurants' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch restaurants');
  }
}

// Fetch single restaurant by slug
export async function getRestaurant(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'restaurants', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch restaurant');
  }
}

// Fetch menu items by restaurant ID
export async function getMenuItemsByRestaurant(restaurantId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'menu-items',
        'metadata.restaurant': restaurantId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch menu items');
  }
}

// Fetch all menu items
export async function getMenuItems() {
  try {
    const response = await cosmic.objects
      .find({ type: 'menu-items' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch menu items');
  }
}

// Fetch all orders
export async function getOrders() {
  try {
    const response = await cosmic.objects
      .find({ type: 'orders' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by order date (newest first)
    const orders = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.order_date || '').getTime();
      const dateB = new Date(b.metadata?.order_date || '').getTime();
      return dateB - dateA;
    });
    
    return orders;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch orders');
  }
}

// Fetch single order by slug
export async function getOrder(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'orders', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch order');
  }
}

// Fetch reviews by restaurant ID
export async function getReviewsByRestaurant(restaurantId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.restaurant': restaurantId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by review date (newest first)
    const reviews = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.review_date || '').getTime();
      const dateB = new Date(b.metadata?.review_date || '').getTime();
      return dateB - dateA;
    });
    
    return reviews;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
// Fetch all blog posts
export async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by publish date (newest first)
    const posts = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.publish_date || '').getTime();
      const dateB = new Date(b.metadata?.publish_date || '').getTime();
      return dateB - dateA;
    });
    
    return posts;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

// Fetch single blog post by slug
export async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
}

// Fetch featured blog posts
export async function getFeaturedPosts() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured posts');
  }
}