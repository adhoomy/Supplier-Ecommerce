import Header from "@/components/layout/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About SupplierHub
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for business supplies and equipment
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At SupplierHub, we're dedicated to providing businesses with high-quality supplies 
                and equipment at competitive prices. Our mission is to make it easy for businesses 
                to find and purchase the supplies they need to operate efficiently.
              </p>
              <p className="text-gray-600">
                We understand that time is money in business, which is why we've streamlined our 
                ordering process to get your supplies to you quickly and reliably.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Quality products from trusted manufacturers
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Fast shipping and reliable delivery
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Competitive pricing and bulk discounts
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Excellent customer service and support
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600">We only offer products that meet our high quality standards.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Speed</h3>
                <p className="text-gray-600">Fast processing and delivery to keep your business running.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service</h3>
                <p className="text-gray-600">Exceptional customer service and support when you need it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
