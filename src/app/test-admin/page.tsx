'use client';

import { useState } from 'react';
import ProductManagement from '@/components/admin/ProductManagement';

export default function TestAdminPage() {
  const [showProductManagement, setShowProductManagement] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Test Page</h1>
        
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Controls</h2>
            <button
              onClick={() => setShowProductManagement(!showProductManagement)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showProductManagement ? 'Hide' : 'Show'} Product Management
            </button>
          </div>

          {showProductManagement && (
            <ProductManagement />
          )}
        </div>
      </div>
    </div>
  );
} 