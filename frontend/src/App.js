import React, { useState } from 'react';
import { FaExclamationTriangle, FaBuilding } from 'react-icons/fa';
import InputForm from './components/InputForm';
import DisplayCard from './components/DisplayCard';
import './App.css';

function App() {
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/business-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong while fetching business data');
      }

      const data = await response.json();
      setBusinessData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeadlineRegenerate = async () => {
    if (!businessData) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `http://localhost:3000/regenerate-headline?name=${encodeURIComponent(businessData.name)}&location=${encodeURIComponent(businessData.location)}`
      );

      if (!response.ok) {
        throw new Error('Failed to regenerate headline');
      }

      const data = await response.json();
      setBusinessData(prev => ({
        ...prev,
        headline: data.headline
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error regenerating headline:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Local Business Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Discover insights about your local business presence
            </p>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 shadow-xl flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Processing Your Request
                </h3>
                <p className="text-gray-600 text-center">
                  Please wait while we fetch your business insights...
                </p>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form Section */}
            <div className="space-y-6">
              <InputForm 
                onSubmit={handleFormSubmit} 
                isLoading={isLoading}
              />
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FaExclamationTriangle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Display Card Section */}
            <div className="space-y-6">
              {businessData && (
                <DisplayCard 
                  data={businessData}
                  onRegenerateHeadline={handleHeadlineRegenerate}
                  isLoading={isLoading}
                />
              )}
              
              {!businessData && !isLoading && (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBuilding className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to get started?
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form to see your business insights
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;