// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Restaurant type
export interface Restaurant extends CosmicObject {
  type: 'restaurants';
  metadata: {
    restaurant_name: string;
    description: string;
    cuisine_type?: {
      key: string;
      value: string;
    };
    logo?: {
      url: string;
      imgix_url: string;
    };
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    address: string;
    phone: string;
    delivery_fee: number;
    minimum_order?: number;
    delivery_time: string;
    is_open?: boolean;
    rating?: number;
  };
}

// Menu Item type
export interface MenuItem extends CosmicObject {
  type: 'menu-items';
  metadata: {
    item_name: string;
    description: string;
    price: number;
    restaurant?: Restaurant;
    image?: {
      url: string;
      imgix_url: string;
    };
    category?: {
      key: string;
      value: string;
    };
    dietary_tags?: string[] | null;
    available?: boolean;
    popular?: boolean;
  };
}

// Order Item interface for JSON field
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

// Order type
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    restaurant?: Restaurant;
    order_items: OrderItem[];
    subtotal: number;
    delivery_fee: number;
    total_amount: number;
    delivery_address: string;
    special_instructions?: string;
    order_status?: {
      key: string;
      value: string;
    };
    order_date: string;
    estimated_delivery?: string;
  };
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    restaurant?: Restaurant;
    reviewer_name: string;
    reviewer_email?: string;
    rating: number;
    comment: string;
    review_date: string;
    verified_purchase?: boolean;
  };
}

// Type literals for select-dropdown values
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked-up' | 'delivered' | 'cancelled';
export type MenuCategory = 'appetizers' | 'mains' | 'desserts' | 'drinks' | 'sides';
export type CuisineType = 'italian' | 'mexican' | 'chinese' | 'japanese' | 'american' | 'indian' | 'thai';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    post_title: string;
    author_name: string;
    publish_date: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    excerpt: string;
    content: string;
    category: {
      key: string;
      value: string;
    };
    featured?: boolean;
    reading_time?: number;
  };
}

// Blog category type
export type BlogCategory = 'food-trends' | 'recipes' | 'restaurant-news' | 'delivery-tips' | 'nutrition';