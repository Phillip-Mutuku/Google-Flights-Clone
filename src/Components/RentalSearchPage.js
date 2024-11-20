import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import {
    Search,
    Star,
    Building2,
    BedDouble,
    Bath,
    Users,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    MapPin,
    Loader,
    ChevronDown,
    Sliders,
    DollarSign,
    Home,
    DoorClosed,
    Coffee,
    ArrowUpDown,
    Utensils
  } from 'lucide-react';

// Date Picker Component
const DatePicker = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  return (
    <div ref={datePickerRef} className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border p-4 w-72 z-50 animate-slideDown">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm text-gray-500 py-1">
            {day}
          </div>
        ))}
        {days.map(day => (
          <button
            key={day.toString()}
            onClick={() => {
              onDateSelect(day);
              onClose();
            }}
            className={`
              p-2 text-sm rounded-full hover:bg-gray-100 transition-colors
              ${format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : ''}
            `}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

// Price Filter Component
const PriceFilter = ({ onClose, onApply, currentFilters }) => {
  const [priceRange, setPriceRange] = useState(currentFilters.priceRange || [0, 50000]);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={filterRef} className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border p-6 w-96 z-10 animate-slideDown">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Price range</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-1 block">Minimum</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">KSh</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-1 block">Maximum</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">KSh</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full pl-12 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded-full relative">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{
              left: `${(priceRange[0] / 50000) * 100}%`,
              right: `${100 - (priceRange[1] / 50000) * 100}%`
            }}
          />
          <input
            type="range"
            min="0"
            max="50000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="50000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <button
          onClick={() => onApply(priceRange)}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

// Map Component
const MapView = ({ properties, selectedProperty, onMarkerClick }) => {
    const [mapCenter, setMapCenter] = useState({ lat: -1.2921, lng: 36.8219 });
    const [isLoading, setIsLoading] = useState(false);
  
    const mapStyles = {
      height: '100%',
      width: '100%',
    };
  
    const mapOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    };
  
    
    const GOOGLE_MAPS_API_KEY = 'AIzaSyAp-jUCpNfP31a4JTl5LXzNObY_zj3RNfU'; 
 
    const fetchMapData = async (location) => {
      setIsLoading(true);
      try {
        const options = {
          method: 'POST',
          url: 'https://google-api31.p.rapidapi.com/map',
          headers: {
            'X-RapidAPI-Key': '28beea17e6mshf30d46e69f7070ap13f5acjsna005b4a18c9b',
            'X-RapidAPI-Host': 'google-api31.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          data: {
            text: location || 'Nairobi',
            place: 'Nairobi',
            city: 'Nairobi',
            country: 'Kenya',
            latitude: mapCenter.lat.toString(),
            longitude: mapCenter.lng.toString(),
            radius: '10000'
          }
        };
  
        // Add delay between API calls to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await axios.request(options);
        if (response.data && response.data.location) {
          setMapCenter({
            lat: response.data.location.lat,
            lng: response.data.location.lng
          });
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
        // Handle specific error cases
        if (error.response?.status === 429) {
          console.log('Rate limit exceeded, please try again later');
        } else if (error.response?.status === 403) {
          console.log('Authentication error, please check API keys');
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    
    const renderMarker = (property) => (
      <MarkerF
        key={property.id}
        position={{ lat: property.lat, lng: property.lng }}
        onClick={() => onMarkerClick(property)}
        label={{
          text: `KSH ${property.price.toLocaleString()}`,
          className: 'marker-label'
        }}
      />
    );
  
    return (
      <>
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={mapCenter}
            options={mapOptions}
            onClick={(e) => {
              const newLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              };
              setMapCenter(newLocation);
            }}
          >
            {properties.map(renderMarker)}
          </GoogleMap>
        </LoadScript>
      </>
    );
  };

// Main Component
const RentalSearchPage = () => {
  // States
  const [searchQuery, setSearchQuery] = useState('vacation rentals i...');
  const [selectedDates, setSelectedDates] = useState({
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: null,
    propertyType: null,
    rating: null,
    rooms: null
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapUpdateEnabled, setMapUpdateEnabled] = useState(true);
  const [properties] = useState([
    {
      id: 1,
      title: "1 bedroom-Short/Long term ...",
      type: "House",
      price: 2133,
      beds: 2,
      bedrooms: 1,
      bathrooms: 1,
      sleeps: 6,
      hasKitchen: true,
      area: "6 sq m",
      image: "https://yellowzebrasafaris.com/media/46255/best-beach-hotels-in-zanzibar-tanzania.jpg?rxy=0.5383333333333333%2C0.715&width=2048&height=1024&format=jpg&v=1da5e0fcbeabd10",
      lat: -1.2921,
      lng: 36.8219,
      location: "Nairobi, Kenya"
    },
    {
      id: 2,
      title: "Urban Villa Stays",
      type: "Villa",
      price: 2714,
      beds: 2,
      bedrooms: 1,
      bathrooms: 1,
      sleeps: 4,
      hasKitchen: true,
      image: "https://www.telegraph.co.uk/content/dam/Travel/hotels/africa/zuri-zanzibar-room.jpg",
      lat: -1.2980,
      lng: 36.8150,
      location: "Westlands, Nairobi"
    },

  ]);

  // Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleDateSelect = (type, date) => {
    setSelectedDates(prev => ({
      ...prev,
      [type]: date
    }));
    setShowDatePicker(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setActiveFilter(null);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    // Scroll to property in list
    document.getElementById(`property-${property.id}`)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // JSX
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          {/* Search Bar and Filters */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search destinations"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Date Pickers */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker('checkIn')}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <span>{format(selectedDates.checkIn, 'EEE, MMM d')}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showDatePicker === 'checkIn' && (
                  <DatePicker
                    selectedDate={selectedDates.checkIn}
                    onDateSelect={(date) => handleDateSelect('checkIn', date)}
                    onClose={() => setShowDatePicker(null)}
                  />
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker('checkOut')}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <span>{format(selectedDates.checkOut, 'EEE, MMM d')}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showDatePicker === 'checkOut' && (
                  <DatePicker
                    selectedDate={selectedDates.checkOut}
                    onDateSelect={(date) => handleDateSelect('checkOut', date)}
                    onClose={() => setShowDatePicker(null)}
                  />
                )}
              </div>
            </div>

            {/* Guests Selector */}
            <div className="relative">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
            </div>
          </div>


            {/* Filters */}
            <div className="flex items-center gap-2 mt-3 overflow-x-auto">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-blue-500">
                <Sliders className="h-4 w-4" />
                <span>All filters</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <DollarSign className="h-4 w-4" />
                <span>Price</span>
                <ChevronDown className="h-4 w-4" />
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Home className="h-4 w-4" />
                <span>Property type</span>
                <ChevronDown className="h-4 w-4" />
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Star className="h-4 w-4" />
                <span>Guest rating</span>
                <ChevronDown className="h-4 w-4" />
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <DoorClosed className="h-4 w-4" />
                <span>Rooms</span>
                <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Coffee className="h-4 w-4" />
                <span>Amenities</span>
                <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort by</span>
                <ChevronDown className="h-4 w-4" />
            </button>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Property Listings */}
          <div className="w-1/2">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-normal">Nairobi · 7,456 results</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors">
                <Maximize2 className="h-5 w-5" />
                <span className="text-sm">Map</span>
              </button>
            </div>

            <div className="space-y-6">
            {properties.map(property => (
                    <div
                        key={property.id}
                        id={`property-${property.id}`}
                        className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="relative">
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                        />
                        <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-100">
                            <MapPin className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300
                                ${i === 0 ? 'opacity-100' : 'opacity-60'}`}
                            />
                            ))}
                        </div>
                        </div>
                        
                        <div className="p-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                            <h3 className="text-base font-medium underline">{property.title}</h3>
                            <span className="text-lg">Ksh {property.price.toLocaleString()}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                <span>{property.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>Sleeps {property.sleeps}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BedDouble className="h-4 w-4" />
                                <span>{property.bedrooms} bedroom</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="h-4 w-4" />
                                <span>{property.bathrooms} bathroom</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BedDouble className="h-4 w-4" />
                                <span>{property.beds} beds</span>
                            </div>
                            {property.hasKitchen && (
                                <div className="flex items-center gap-2">
                                <Utensils className="h-4 w-4" />
                                <span>Kitchen</span>
                                </div>
                            )}
                            </div>

                            <button className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            View details
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <button className="group flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                <span>Next</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-4 text-center text-gray-600 text-sm">
              Showing results 1 - 18 of 7,456
            </div>
          </div>

          {/* Map */}
          <div className="w-1/2 sticky top-24 h-[calc(100vh-6rem)]">
            <div className="w-full h-full rounded-lg border relative">
              <MapView
                properties={properties}
                selectedProperty={selectedProperty}
                onMarkerClick={handlePropertySelect}
              />
              
              <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md">
                <label className="flex items-center px-4 py-2 space-x-2">
                  <input
                    type="checkbox"
                    checked={mapUpdateEnabled}
                    onChange={(e) => setMapUpdateEnabled(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm">Update list when map moves</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Join user studies</a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Feedback</a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">Help Center</a>
            </div>
            <div>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                Currency · KES
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <div>
              <span>Nairobi, Kenya</span>
              <span className="mx-2">·</span>
              <span>Based on your past activity</span>
              <button className="text-blue-500 ml-2 hover:underline">Learn more</button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Displayed currencies may differ from the currencies used to book properties.
            <button className="text-blue-500 ml-1 hover:underline">Learn more</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalSearchPage;