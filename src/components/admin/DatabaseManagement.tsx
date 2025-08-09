'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface DatabaseStatus {
  totalProducts: number;
  categories: Array<{ _id: string; count: number }>;
}

export default function DatabaseManagement() {
  const { session } = useAuth();
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [showSeedConfirmation, setShowSeedConfirmation] = useState(false);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  useEffect(() => {
    fetchDatabaseStatus();
  }, []);

  const fetchDatabaseStatus = async () => {
    try {
      const response = await fetch('/api/seed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDatabaseStatus(data);
      } else {
        console.error('Failed to fetch database status');
      }
    } catch (error) {
      console.error('Error fetching database status:', error);
    }
  };

  const handleSeedDatabase = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setShowSeedConfirmation(false);
        fetchDatabaseStatus(); // Refresh status
      } else {
        setMessage(data.message || 'Failed to seed database');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred while seeding the database');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/seed', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setShowClearConfirmation(false);
        fetchDatabaseStatus(); // Refresh status
      } else {
        setMessage(data.message || 'Failed to clear database');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred while clearing the database');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Database Management
        </h1>

        {/* Environment Warning */}
        {isProduction && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Production Environment
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Database seeding and clearing operations are disabled in production environments for security reasons.
                    These operations are only available in development and testing environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database Status */}
        {databaseStatus && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-lg font-medium text-blue-900 mb-3">Database Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700">Total Products</p>
                <p className="text-2xl font-bold text-blue-900">{databaseStatus.totalProducts}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Categories</p>
                <div className="space-y-1">
                  {databaseStatus.categories.map((category) => (
                    <div key={category._id} className="flex justify-between text-sm">
                      <span className="text-blue-700 capitalize">{category._id}</span>
                      <span className="font-medium text-blue-900">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database Operations */}
        <div className="space-y-4">
          {/* Seed Database */}
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Seed Database</h3>
            <p className="text-sm text-gray-600 mb-4">
              Populate the database with sample products for testing and development purposes.
              This will only work if the database is currently empty.
            </p>
            <button
              onClick={() => setShowSeedConfirmation(true)}
              disabled={isProduction || loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Seed Database
            </button>
          </div>

          {/* Clear Database */}
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Clear Database</h3>
            <p className="text-sm text-gray-600 mb-4">
              ⚠️ <strong>Warning:</strong> This will permanently delete all products from the database.
              This action cannot be undone.
            </p>
            <button
              onClick={() => setShowClearConfirmation(true)}
              disabled={isProduction || loading}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Database
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mt-6 p-4 rounded-md ${
            messageType === 'success' ? 'bg-green-50 border border-green-200' :
            messageType === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {messageType === 'success' && (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {messageType === 'error' && (
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {messageType === 'info' && (
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm ${
                  messageType === 'success' ? 'text-green-800' :
                  messageType === 'error' ? 'text-red-800' :
                  'text-blue-800'
                }`}>
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Seed Confirmation Modal */}
        {showSeedConfirmation && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Database Seeding</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to seed the database with sample products? 
                  This will only work if the database is currently empty.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowSeedConfirmation(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSeedDatabase}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Seeding...' : 'Confirm Seed'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirmation && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg font-medium text-red-900 mb-4">⚠️ Danger Zone</h3>
                <p className="text-sm text-gray-600 mb-6">
                  <strong>Warning:</strong> This action will permanently delete ALL products from the database.
                  This action cannot be undone and will affect all users.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowClearConfirmation(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearDatabase}
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Clearing...' : 'Confirm Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
