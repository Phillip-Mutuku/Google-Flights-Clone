import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  ChevronDown, 
  Globe, 
  Wallet, 
  MapPin, 
  User, 
  ArrowRightLeft, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Map,
  Plus
} from 'lucide-react';
import '../App.css';

const FlightsPage = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [departureDate, setDepartureDate] = useState('Sat, Nov 23');
  const [returnDate, setReturnDate] = useState('Wed, Nov 27');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('Nairobi');
  const [openQuestion, setOpenQuestion] = useState(null);

  const airports = [
    {
      name: 'Jomo Kenyatta International Airport (NBO)',
      city: 'Nairobi',
      duration: '19 min',
      distance: '12 km'
    },
    {
      name: 'Wilson Airport (WIL)',
      city: 'Nairobi',
      duration: '12 min',
      distance: '3 km'
    },
    {
      name: 'Kisumu International Airport (KIS)',
      city: 'Kisumu',
      duration: '6 hr 23 min',
      distance: '268 km'
    },
    {
      name: 'British Airforces Airport (NYK)',
      city: 'Nanyuki',
      duration: '3 hr 27 min',
      distance: '150 km'
    }
  ];

  const seasons = [
    {
      type: 'Off-season',
      months: 'Apr – Jul',
      description: 'Less popular and lower prices',
      icon: '🚀'
    },
    {
      type: 'Peak season',
      months: 'Oct – Jan',
      description: 'Most popular and higher prices',
      icon: '🌳'
    }
  ];

  const faqs = [
    {
      question: "When should you visit Nairobi?",
      answer: "The best time to visit Nairobi is during the dry seasons from June to October and December to March. These periods offer the most favorable weather conditions for tourism and outdoor activities."
    },
    {
      question: "What is the best airport to fly into Nairobi?",
      answer: "Jomo Kenyatta International Airport (NBO) is the main international airport serving Nairobi and is typically the best choice for most travelers."
    },
    {
      question: "How can I find last-minute flight deals to Nairobi?",
      answer: "To find last-minute deals, set up price alerts, be flexible with your travel dates, and consider flying during off-peak seasons."
    },
    {
      question: "How can I find flights deals to Nairobi?",
      answer: "Book in advance, compare prices across multiple airlines, travel during off-peak seasons, and sign up for airline newsletters to receive special offers."
    }
  ];

  const popularRoutes = [
    { from: "London", to: "Nairobi" },
    { from: "New York", to: "Nairobi" },
    { from: "Washington", to: "Nairobi" },
    { from: "Frankfurt", to: "Nairobi" },
    { from: "Melbourne", to: "Nairobi" },
    { from: "Mumbai", to: "Nairobi" },
    { from: "Madrid", to: "Nairobi" },
    { from: "Tokyo", to: "Nairobi" },
    { from: "Istanbul", to: "Nairobi" },
    { from: "Dubai", to: "Nairobi" }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#F5F7FF] h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <rect width="1440" height="400" fill="#F5F7FF"/>
            
            {/* Mountains in background */}
            <path d="M0 250L200 150L400 200L600 100L800 180L1000 120L1200 170L1440 150V400H0V250Z" fill="#E8EDFF"/>
            <path d="M200 280L400 200L600 250L800 180L1000 220L1200 180L1440 200V400H200V280Z" fill="#D1DEFF"/>
            
            {/* Trees */}
            <path d="M100 300L120 260L140 300Z" fill="#D1DEFF"/>
            <path d="M160 320L180 280L200 320Z" fill="#D1DEFF"/>
            <path d="M1240 310L1260 270L1280 310Z" fill="#D1DEFF"/>
            <path d="M1300 330L1320 290L1340 330Z" fill="#D1DEFF"/>
            
            {/* Clouds */}
            <circle cx="200" cy="100" r="30" fill="white"/>
            <circle cx="230" cy="100" r="25" fill="white"/>
            <circle cx="1000" cy="80" r="40" fill="white"/>
            <circle cx="1040" cy="80" r="30" fill="white"/>
            
            {/* Small airplane */}
            <path d="M1200 80L1220 70L1240 80L1220 90Z" fill="#90A4FF"/>
            
            {/* People silhouette */}
            <g transform="translate(1100, 280)">
              <rect x="0" y="0" width="8" height="20" fill="#2563EB"/>
              <rect x="15" y="5" width="6" height="15" fill="#2563EB"/>
              <path d="M0 0C5 -5 10 -5 15 0" stroke="#FF4646" strokeWidth="3"/>
            </g>
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-normal text-gray-900">Flights</h1>
        </div>
      </div>

      {/* Search Container */}
      <div className="w-full px-4 -mt-24 relative z-10">
        <div className="max-w-[80%] mx-auto bg-white rounded-2xl shadow-lg">
          {/* Trip Type, Passengers, Class Row */}
          <div className="flex items-center px-6 pt-4 pb-2">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 cursor-pointer">
                <ArrowRightLeft className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Round trip</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">2</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-gray-700">Economy</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Search Fields */}
          <div className="p-4">
            <div className="grid grid-cols-12 gap-2">
              {/* From Field */}
              <div className="col-span-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Map className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="Where from?"
                    className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-200"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="col-span-1 flex items-center justify-center">
                <button 
                  onClick={handleSwapLocations}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowRightLeft className="w-5 h-5 text-gray-500 rotate-90" />
                </button>
              </div>

              {/* To Field */}
              <div className="col-span-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Map className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    placeholder="Where to?"
                    className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-200"
                  />
                </div>
              </div>

              {/* Date Fields */}
              <div className="col-span-3">
                <div className="flex gap-2">
                  {/* Departure Date */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={departureDate}
                        readOnly
                        className="w-full pl-10 pr-8 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-200 cursor-pointer"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <ChevronLeft className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Return Date */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={returnDate}
                        readOnly
                        className="w-full pl-10 pr-8 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-200 cursor-pointer"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <ChevronLeft className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="absolute bottom-50 right-50  translate-y-1/2 translate-x-3/4  px-6">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content sections */}
      <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm mb-6">
          <span className="text-blue-500">Flights</span>
          <span className="text-gray-400">›</span>
          <span className="text-blue-500">To Kenya</span>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">To Nairobi</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl font-medium text-gray-900 mb-12">Cheap flights to Nairobi</h1>

        {/* Airports and Seasons Grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* Airports Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
              Popular airports near Nairobi
              <span className="text-gray-400 border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs">i</span>
            </h2>

            <div className="space-y-6">
              {airports.map((airport, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">{airport.name}</h3>
                    <div className="text-gray-500 text-sm flex items-center gap-6">
                      <span>{airport.city}</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {airport.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {airport.distance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seasons Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">When to visit</h2>
            <div className="space-y-8">
              {seasons.map((season, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${
                    season.type === 'Off-season' ? 'bg-blue-50' : 'bg-green-50'
                  } flex items-center justify-center`}>
                    <span className="text-2xl">{season.icon}</span>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">{season.type}</div>
                    <h3 className="text-[22px] font-medium text-gray-900 mb-1">{season.months}</h3>
                    <div className="text-gray-600">{season.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Nairobi Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-medium text-gray-900 mb-8">About Nairobi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <p className="text-gray-600 leading-relaxed">
                Nairobi is Kenya's capital city. In addition to its urban core, the city has 
                Nairobi National Park, a large game reserve known for breeding endangered 
                black rhinos and home to giraffes, zebras and lions. Next to it is a well-
                regarded elephant orphanage operated by the David Sheldrick Wildlife Trust. 
                Nairobi is also often used as a jumping-off point for safari trips elsewhere in 
                Kenya.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden h-[280px]">
              <img 
                src="https://www.blackpast.org/wp-content/uploads/prodimages/files/Nairobi_city_center_May_2_2015_Photo_by_Ninara_CC_BY_2.0.jpg"
                alt="Nairobi cityscape" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-medium text-gray-900 mb-8">
            Frequently asked questions about flying to Nairobi
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-gray-200 py-6"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-lg text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-400 transition-transform ${
                      openQuestion === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openQuestion === index && (
                  <div className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Popular Routes Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-medium text-gray-900 mb-8">Search more flights</h2>
          
          <div className="mb-12">
            <h3 className="text-2xl text-gray-900 mb-6">More places to fly</h3>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex gap-8">
                <button className="text-blue-500 pb-4 border-b-2 border-blue-500 font-medium">
                  Popular routes to Nairobi
                </button>
                <button className="text-gray-600 pb-4">
                  Flights from Nairobi
                </button>
              </div>
            </div>

            {/* Flight routes grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              {popularRoutes.map((route, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-blue-500 hover:underline"
                >
                  Flights from {route.from} to {route.to}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-200 pt-8">
          {/* Location and currency pills */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Language · English (United States)</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Location · Kenya</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Wallet className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Currency · KES</span>
            </div>
          </div>

          {/* Currency notice */}
          <p className="text-gray-500 mb-8">
            Current language and currency options applied: English (United States) - Kenya - KES
            <br />
            Displayed currencies may differ from the currencies used to purchase flights.{' '}
            <a href="#" className="text-blue-500 hover:underline">Learn more</a>
          </p>

          {/* Footer links */}
          <div className="flex flex-wrap gap-8 mb-8">
            <a href="#" className="text-blue-500 hover:underline">About</a>
            <a href="#" className="text-blue-500 hover:underline">Privacy</a>
            <a href="#" className="text-blue-500 hover:underline">Terms</a>
            <a href="#" className="text-blue-500 hover:underline">Join user studies</a>
            <a href="#" className="text-blue-500 hover:underline">Feedback</a>
            <a href="#" className="text-blue-500 hover:underline">Help Center</a>
          </div>

          {/* Dropdown menus */}
          <div className="flex gap-8">
            <button className="flex items-center gap-2 text-blue-500">
              International sites
              <ChevronDown className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 text-blue-500">
              Explore flights
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;