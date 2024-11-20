import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageSquare, ExternalLink } from 'lucide-react';

const HelpPage = () => {
  const [expandedSection, setExpandedSection] = useState('flights');
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = {
    flights: [
      'Track flights & prices',
      'How to find the best fares with Google Flights',
      'Filter flight prices by bag fees',
      'How to change or cancel your flight',
      'Understanding your flight and booking options',
      'Customize your currency, language, or location',
      'About Price guarantee on Google Flights',
      'Check emissions on Google Flights',
      'How emissions are estimated',
      'Choose whether to show your pricing and availability content on Google Flights',
      'Flight queries on Google Search'
    ],
    hotels: [
      'Find and book hotels',
      'Hotel pricing and availability',
      'Manage hotel bookings',
      'Hotel reviews and photos',
      'Hotel amenities and features'
    ],
    transportation: [
      'Ground transportation options',
      'Car rentals',
      'Public transit information',
      'Transportation booking policies',
      'Airport transfers'
    ]
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // You can implement search functionality here
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <div className="sticky top-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex space-x-8">
              <button className="text-blue-600 border-b-2 border-blue-600 pb-4 -mb-4 text-sm font-medium">
                Help Center
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm font-medium">
                Announcements
              </button>
            </div>
            <button className="flex items-center gap-2 text-blue-600 text-sm">
              <span>Travel</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium mb-8 text-gray-900 dark:text-gray-100">
            How can we help you?
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Describe your issue"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Help Topics */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
            Browse help topics
          </h2>
          <div className="border dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
            {/* Flights Section */}
            <div className="border-b dark:border-gray-700">
              <button
                onClick={() => setExpandedSection(expandedSection === 'flights' ? '' : 'flights')}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">Flights</span>
                {expandedSection === 'flights' ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSection === 'flights' && (
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
                  <ul className="space-y-4">
                    {helpTopics.flights.map((topic, index) => (
                      <li key={index}>
                        <button className="text-left text-blue-600 hover:underline text-sm">
                          {topic}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Hotels Section */}
            <div className="border-b dark:border-gray-700">
              <button
                onClick={() => setExpandedSection(expandedSection === 'hotels' ? '' : 'hotels')}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">Hotels</span>
                {expandedSection === 'hotels' ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSection === 'hotels' && (
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
                  <ul className="space-y-4">
                    {helpTopics.hotels.map((topic, index) => (
                      <li key={index}>
                        <button className="text-left text-blue-600 hover:underline text-sm">
                          {topic}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Transportation Section */}
            <div>
              <button
                onClick={() => setExpandedSection(expandedSection === 'transportation' ? '' : 'transportation')}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">Transportation</span>
                {expandedSection === 'transportation' ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSection === 'transportation' && (
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
                  <ul className="space-y-4">
                    {helpTopics.transportation.map((topic, index) => (
                      <li key={index}>
                        <button className="text-left text-blue-600 hover:underline text-sm">
                          {topic}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm border-t dark:border-gray-700 pt-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center sm:justify-start text-gray-600 dark:text-gray-400">
              <span>©2024 Google</span>
              <span className="hidden sm:inline">-</span>
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              <span className="hidden sm:inline">-</span>
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:underline">
              <MessageSquare className="w-4 h-4" />
              <span>Send feedback about our Help Center</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;