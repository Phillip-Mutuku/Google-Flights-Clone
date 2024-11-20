import React from 'react';

const FlightSettings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-medium mb-8 text-gray-800 dark:text-gray-200">
        Flights settings
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
            Travel email subscriptions
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Flight price alerts</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive price alerts and booking tips for flights. See{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    tracked flight prices
                  </a>
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Travel tips</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive tips to help you get ready for an upcoming trip, such as the weather forecast, how to get around, and more.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FlightSettings;