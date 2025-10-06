import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - FoodHub',
  description: 'Get in touch with FoodHub support team',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&auto=format,compress)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-white/90">
                Have a question or need help? We're here for you 24/7.
              </p>
            </div>
          </div>
        </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Issue</option>
                      <option value="delivery">Delivery Question</option>
                      <option value="payment">Payment Problem</option>
                      <option value="restaurant">Restaurant Partnership</option>
                      <option value="feedback">General Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Quick Contact */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600">1-800-FOODHUB</p>
                        <p className="text-sm text-gray-500 mt-1">Mon-Sun, 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">✉️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">support@foodhub.com</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📍</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                        <p className="text-gray-600">123 Food Street</p>
                        <p className="text-gray-600">San Francisco, CA 94102</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-sm p-8 text-white">
                  <h3 className="text-xl font-bold mb-3">Looking for Quick Answers?</h3>
                  <p className="text-white/90 mb-4">
                    Check out our FAQ section for instant solutions to common questions.
                  </p>
                  <a
                    href="/faq"
                    className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    View FAQ
                  </a>
                </div>

                {/* Business Inquiries */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Restaurant Partnership</h3>
                  <p className="text-gray-600 mb-4">
                    Interested in partnering with FoodHub? We'd love to have you on our platform!
                  </p>
                  <a
                    href="/partners"
                    className="inline-block text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Help Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="/help" className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Tracking</h3>
                <p className="text-sm text-gray-600">Track your order in real-time</p>
              </a>

              <a href="/help" className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-3">💳</div>
                <h3 className="font-semibold text-gray-900 mb-2">Payment Methods</h3>
                <p className="text-sm text-gray-600">Learn about payment options</p>
              </a>

              <a href="/help" className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-semibold text-gray-900 mb-2">Returns & Refunds</h3>
                <p className="text-sm text-gray-600">Our refund policy explained</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}