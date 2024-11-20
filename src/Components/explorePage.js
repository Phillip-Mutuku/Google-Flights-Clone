import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import axios from 'axios';
import {
  ArrowLeftRight,
  Users,
  Calendar,
  ChevronDown,
  Filter,
  Globe,
  Plus,
  Minus,
  Maximize2,
  MapPin,
  X,
  Check,
  Plane
} from 'lucide-react';

// Dropdown Menu Component
const DropdownMenu = ({ isOpen, onClose, title, children }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50 animate-slideDown"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">{title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

const ExplorePage = () => {
  // States
  const [tripType, setTripType] = useState('round');
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [locations, setLocations] = useState({
    from: '',
    to: ''
  });
  const [dates, setDates] = useState({
    departure: 'Sat, Nov 23',
    return: 'Wed, Nov 27'
  });
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [stops, setStops] = useState('any');
  const [travelMode, setTravelMode] = useState('any');
  const [flightPath, setFlightPath] = useState(null);
  const [zoom, setZoom] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState(null);

  // Options and Configuration
  const tripTypes = [
    { value: 'round', label: 'Round trip' },
    { value: 'one-way', label: 'One-way' },
    { value: 'multi-city', label: 'Multi-city' }
  ];

  const cabinClasses = [
    'Economy',
    'Premium Economy',
    'Business',
    'First Class'
  ];

  const stopOptions = [
    { value: 'any', label: 'Any number of stops' },
    { value: 'nonstop', label: 'Nonstop only' },
    { value: '1-stop', label: '1 stop max' },
    { value: '2-stops', label: '2 stops max' }
  ];

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    fullscreenControl: false,
    minZoom: 2,
    maxZoom: 8,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180
      },
      strictBounds: true
    },
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#a4ddf5' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#e8f5e9' }]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#c9c9c9' }]
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  // Utility Functions
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const calculateFlightPath = (from, to) => {
    if (!from.lat || !to.lat) return;

    const numPoints = 100;
    const points = [];
    
    for (let i = 0; i <= numPoints; i++) {
      const fraction = i / numPoints;
      const lat = from.lat + (to.lat - from.lat) * fraction;
      const lng = from.lng + (to.lng - from.lng) * fraction;
      const altitude = Math.sin(fraction * Math.PI) * 0.5;
      
      points.push({
        lat: lat + altitude,
        lng: lng
      });
    }
    
    setFlightPath(points);
  };

  const fetchLocationData = async (query, type) => {
    if (!query) return;
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
          data: { text: query }
        };

      const response = await axios.request(options);
      if (response.data?.location) {
        const newLocation = {
          ...response.data.location,
          name: query
        };

        setLocations(prev => ({
          ...prev,
          [type]: newLocation
        }));

        if (type === 'from' && !locations.to) {
          setMapCenter(response.data.location);
        }
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchLocation = useCallback(
    debounce((query, type) => fetchLocationData(query, type), 500),
    []
  );

  // Effect to update flight path when locations change
  useEffect(() => {
    if (locations.from && locations.to) {
      calculateFlightPath(locations.from, locations.to);
    }
  }, [locations]);
  // Render map elements
  const renderMapElements = () => (
    <>
      {locations.from && locations.to && flightPath && (
        <PolylineF
          path={flightPath}
          options={{
            strokeColor: '#2563EB',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            geodesic: true
          }}
        />
      )}
      {locations.from && (
        <MarkerF
          position={{ lat: locations.from.lat, lng: locations.from.lng }}
          icon={{
            path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "#2563EB",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#1E40AF",
            scale: 1.5
          }}
        />
      )}
      {locations.to && (
        <MarkerF
          position={{ lat: locations.to.lat, lng: locations.to.lng }}
          icon={{
            path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "#2563EB",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#1E40AF",
            scale: 1.5
          }}
        />
      )}
    </>
  );

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="h-screen flex">
      {/* Left Side - Content */}
      <div className="w-[460px] flex flex-col border-r">
        {/* Header Section */}
        <div className="p-4 space-y-4">
          {/* Trip Type Row */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setActiveDropdown('tripType')}
                className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
              >
                <ArrowLeftRight className="h-5 w-5" />
                <span className="text-sm">{tripTypes.find(t => t.value === tripType)?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <DropdownMenu
                isOpen={activeDropdown === 'tripType'}
                onClose={() => setActiveDropdown(null)}
                title="Trip type"
              >
                {tripTypes.map(type => (
                  <button
                    key={type.value}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    onClick={() => {
                      setTripType(type.value);
                      setActiveDropdown(null);
                    }}
                  >
                    <span>{type.label}</span>
                    {tripType === type.value && <Check className="h-4 w-4 text-blue-500" />}
                  </button>
                ))}
              </DropdownMenu>
            </div>

            <div className="relative">
              <button
                onClick={() => setActiveDropdown('passengers')}
                className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Users className="h-5 w-5" />
                <span className="text-sm">{passengers}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <DropdownMenu
                isOpen={activeDropdown === 'passengers'}
                onClose={() => setActiveDropdown(null)}
                title="Passengers"
              >
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={passengers <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{passengers}</span>
                    <button
                      onClick={() => setPassengers(passengers + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </DropdownMenu>
            </div>

            <div className="relative">
              <button
                onClick={() => setActiveDropdown('cabinClass')}
                className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm">{cabinClass}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <DropdownMenu
                isOpen={activeDropdown === 'cabinClass'}
                onClose={() => setActiveDropdown(null)}
                title="Cabin class"
              >
                {cabinClasses.map(cls => (
                  <button
                    key={cls}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    onClick={() => {
                      setCabinClass(cls);
                      setActiveDropdown(null);
                    }}
                  >
                    <span>{cls}</span>
                    {cabinClass === cls && <Check className="h-4 w-4 text-blue-500" />}
                  </button>
                ))}
              </DropdownMenu>
            </div>
          </div>

          {/* Location Inputs */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Where from?"
                className="w-full pl-12 pr-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={locations.from?.name || ''}
                onChange={(e) => debouncedFetchLocation(e.target.value, 'from')}
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-12 pr-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={locations.to?.name || ''}
                onChange={(e) => debouncedFetchLocation(e.target.value, 'to')}
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-start px-4 py-3 border rounded-lg hover:bg-gray-50">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm">{dates.departure}</span>
            </button>
            {tripType === 'round' && (
              <button className="flex items-center justify-start px-4 py-3 border rounded-lg hover:bg-gray-50">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm">{dates.return}</span>
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-blue-500 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              <span>All filters</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              <span>Stops</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              <span>Travel mode</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              Interests
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <h2 className="text-xl font-normal">Where are you flying from?</h2>
            <button className="text-blue-500 hover:underline">
              Get started
            </button>
            <div className="mt-8">
              <Plane className="h-24 w-24 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-500 hover:underline">
                <Globe className="h-5 w-5" />
                <span>English (United States)</span>
              </button>
              <button className="text-blue-500 hover:underline">
                KES
              </button>
            </div>
            <div className="text-sm text-gray-500 space-x-2">
              <button className="hover:underline">Keyboard shortcuts</button>
              <span>·</span>
              <span>Map data ©2024</span>
              <span>·</span>
              <button className="hover:underline">Terms</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Map */}
      <div className="flex-1 relative">
      <LoadScript googleMapsApiKey="AIzaSyAp-jUCpNfP31a4JTl5LXzNObY_zj3RNfU">
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%'
          }}
          zoom={zoom}
          center={mapCenter}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {renderMapElements()}
        </GoogleMap>
      </LoadScript>

{/* Map Controls */}
<div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => {
            if (map) {
              const newZoom = Math.min((map.getZoom() || zoom) + 1, 8);
              map.setZoom(newZoom);
              setZoom(newZoom);
            }
          }}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          onClick={() => {
            if (map) {
              const newZoom = Math.max((map.getZoom() || zoom) - 1, 2);
              map.setZoom(newZoom);
              setZoom(newZoom);
            }
          }}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
        >
          <Minus className="h-5 w-5" />
        </button>
        <button
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
};

export default ExplorePage;