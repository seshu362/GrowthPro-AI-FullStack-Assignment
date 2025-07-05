import React from 'react';
import { FaMapMarkerAlt, FaStar, FaComments, FaRobot, FaSync, FaSpinner } from 'react-icons/fa';

const DisplayCard = ({ data, onRegenerateHeadline, isLoading }) => {
  const handleRegenerateClick = () => {
    if (!isLoading) {
      onRegenerateHeadline();
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={i} className="w-5 h-5 text-yellow-400" />
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <FaStar className="w-5 h-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <FaStar className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    // Empty stars
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Business Overview
        </h2>
        <p className="text-gray-600">
          Here's what we found about {data.name}
        </p>
      </div>

      {/* Business Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {data.name}
        </h3>
        <p className="text-gray-600 flex items-center">
          <FaMapMarkerAlt className="w-4 h-4 mr-1" />
          {data.location}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Rating Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Google Rating</span>
            <FaStar className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {data.rating}
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(data.rating)}
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Total Reviews</span>
            <FaComments className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {data.reviews.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            Customer reviews
          </div>
        </div>
      </div>

      {/* SEO Headline Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-gray-900">
            AI-Generated SEO Headline
          </h4>
          <div className="flex items-center text-sm text-purple-600">
            <FaRobot className="w-4 h-4 mr-1" />
            AI Powered
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-gray-800 font-medium leading-relaxed">
            {data.headline}
          </p>
        </div>
        <button
          onClick={handleRegenerateClick}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin w-5 h-5 mr-3 text-white" />
              Generating New Headline...
            </>
          ) : (
            <>
              <FaSync className="w-5 h-5 mr-2" />
              Regenerate SEO Headline
            </>
          )}
        </button>
      </div>

      {/* Additional Info */}
      <div className="text-xs text-gray-500 text-center">
        Data generated on {new Date(data.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
};

export default DisplayCard;