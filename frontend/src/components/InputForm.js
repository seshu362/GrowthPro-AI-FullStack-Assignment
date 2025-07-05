import React, { useState } from 'react';
import { FaSearch, FaBuilding, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const InputForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Business name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Business name must be at least 2 characters';
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    } else if (formData.location.trim().length < 2) {
      errors.location = 'Location must be at least 2 characters';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    onSubmit({
      name: formData.name.trim(),
      location: formData.location.trim()
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
          <FaBuilding className="w-6 h-6 mr-2 text-blue-600" />
          Business Information
        </h2>
        <p className="text-gray-600">
          Enter your business details to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              validationErrors.name 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="e.g., Cake & Co, Mumbai Cafe, etc."
            disabled={isLoading}
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FaExclamationTriangle className="w-4 h-4 mr-1" />
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Location Field */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              validationErrors.location 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="e.g., Mumbai, Delhi, Bangalore, etc."
            disabled={isLoading}
          />
          {validationErrors.location && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FaExclamationTriangle className="w-4 h-4 mr-1" />
              {validationErrors.location}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin w-5 h-5 mr-3 text-white" />
              Getting Business Insights...
            </>
          ) : (
            <>
              <FaSearch className="w-5 h-5 mr-2" />
              Get Business Insights
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;