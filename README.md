# 🍔 FoodHub - Food Delivery Platform

![App Preview](https://imgix.cosmicjs.com/bd55dcb0-a211-11f0-8dcc-651091f6a7c0-photo-1555396273-367ea4eb4db5-1759685752067.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive food delivery platform built with Next.js 15 and Cosmic CMS. Browse restaurants, explore menus, and track orders with a seamless user experience inspired by leading delivery services.

## ✨ Features

- 🏪 **Restaurant Discovery** - Browse restaurants with detailed profiles, ratings, and cuisine types
- 🍕 **Dynamic Menus** - Explore categorized menu items with pricing and dietary information
- 📦 **Order Tracking** - Monitor order status from pending to delivered
- 🔍 **Smart Filtering** - Filter by cuisine type and dietary preferences
- 📱 **Fully Responsive** - Optimized for mobile and desktop experiences
- ⚡ **Real-time Updates** - Content managed through Cosmic CMS
- 🎨 **Modern UI** - Clean design with smooth animations and transitions

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68e2abc9f3248c5d9f9504b1&clone_repository=68e2cf085011374dcd263932)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a Doordash clone"

### Code Generation Prompt

> Based on the content model I created for "Create a Doordash clone", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Cosmic (Headless CMS)
- **Language**: TypeScript
- **Package Manager**: Bun
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Basic knowledge of React and Next.js

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd foodhub
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Restaurants with Filters

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all restaurants
const response = await cosmic.objects
  .find({ type: 'restaurants' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const restaurants = response.objects

// Filter by cuisine type
const italianRestaurants = restaurants.filter(
  r => r.metadata?.cuisine_type?.key === 'italian'
)
```

### Fetching Menu Items for a Restaurant

```typescript
// Get menu items for a specific restaurant
const response = await cosmic.objects
  .find({ 
    type: 'menu-items',
    'metadata.restaurant': restaurantId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const menuItems = response.objects
```

### Fetching Orders with Full Details

```typescript
// Get orders with restaurant and item details
const response = await cosmic.objects
  .find({ type: 'orders' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const orders = response.objects
```

### Creating a New Order

```typescript
// Create a new order
await cosmic.objects.insertOne({
  type: 'orders',
  title: `Order #${orderNumber}`,
  metadata: {
    order_number: `#${orderNumber}`,
    customer_name: 'John Doe',
    customer_email: 'john@example.com',
    customer_phone: '(555) 123-4567',
    restaurant: restaurantId,
    order_items: [
      { name: 'Margherita Pizza', quantity: 1, price: 14.99 }
    ],
    subtotal: 14.99,
    delivery_fee: 3.99,
    total_amount: 18.98,
    delivery_address: '123 Main St, City, ST 12345',
    special_instructions: '',
    order_status: 'pending',
    order_date: new Date().toISOString().split('T')[0],
    estimated_delivery: '45-55 min'
  }
})
```

## 🎨 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Object Types

1. **Restaurants** (`restaurants`)
   - Restaurant name, description, cuisine type
   - Logo and cover images
   - Address, phone, delivery details
   - Rating and operational status

2. **Menu Items** (`menu-items`)
   - Item name, description, price
   - Restaurant relationship
   - Category and dietary tags
   - Availability status

3. **Orders** (`orders`)
   - Order number and customer details
   - Restaurant relationship
   - Order items array (JSON)
   - Status tracking and delivery info

### Content Relationships

The app leverages Cosmic's object relationships:
- Menu Items → Restaurants (object metafield)
- Orders → Restaurants (object metafield)
- Uses `depth(1)` to fetch related data in a single query

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📱 Features Breakdown

- **Home Page**: Featured restaurants with quick filters
- **Restaurant Page**: Detailed view with full menu
- **Menu Item Cards**: Images, pricing, and dietary tags
- **Order Tracking**: Real-time status updates
- **Responsive Design**: Mobile-first approach
- **Loading States**: Smooth transitions and skeletons
- **Error Handling**: Graceful fallbacks for missing data

## 🔧 Development

```bash
# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run linting
bun run lint

# Type checking
bun run type-check
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Built with [Cosmic](https://www.cosmicjs.com) headless CMS
- Powered by [Next.js 15](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

Made with ❤️ using Cosmic CMS
<!-- README_END -->