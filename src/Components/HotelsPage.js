import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, User2, Filter, Star, Navigation, Wifi, Car, ChevronDown } from 'lucide-react';
import axios from 'axios';

// Function to load Google Maps script
const loadGoogleMapsScript = (callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  const existingScript = document.getElementById('googleMapsScript');
  if (existingScript) {
    existingScript.addEventListener('load', callback);
    return;
  }

  const script = document.createElement('script');
  script.id = 'googleMapsScript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAp-jUCpNfP31a4JTl5LXzNObY_zj3RNfU&libraries=places&callback=Function.prototype`;
  script.async = true;
  script.defer = true;
  
  script.addEventListener('load', () => {
    setTimeout(callback, 100);
  });
  
  document.head.appendChild(script);
};

const HotelsPage = () => {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const mapInstanceRef = useRef(null);

  const filters = [
    { id: 'price', label: "Under KES 3,000", icon: null },
    { id: 'pool', label: "Pool", icon: Navigation },
    { id: '4plus', label: "4+ rating", icon: Star },
    { id: 'parking', label: "Free parking", icon: Car },
    { id: 'wifi', label: "Free Wi-Fi", icon: Wifi }
  ];

  const hotels = [
    {
      id: 1,
      name: "Decasa Hotel Nairobi",
      price: 2512,
      rating: 4.1,
      reviews: 1069,
      discount: "22% less than usual",
      amenities: ["3-star hotel", "Free breakfast", "Free Wi-Fi", "Air conditioning", "Bar", "Restaurant"],
      image: "https://content.r9cdn.net/rimg/himg/ab/e6/5d/ice-89469-4952171_3XL-182266.jpg",
      location: "Excellent location",
      coordinates: { lat: -1.2855, lng: 36.8226 }
    },
    {
      id: 2,
      name: "Seasons Hotels And Lodges",
      price: 13721,
      rating: 5.0,
      reviews: 3,
      amenities: ["5-star hotel", "Pool", "Free Wi-Fi", "Spa"],
      image: "https://media.radissonhotels.net/image/radisson-blu-hotel-nairobi-upper-hill/exterior/16256-114178-f62751420_3xl.jpg",
      location: "Excellent location",
      coordinates: { lat: -1.2890, lng: 36.8150 }
    },
    {
      id: 3,
      name: "Sagana Getaway",
      price: 11201,
      rating: 4.1,
      reviews: 95,
      amenities: ["Vacation rental", "Sleeps 2", "Pool", "Free Wi-Fi"],
      image: "https://images.trvl-media.com/lodging/18000000/17600000/17595200/17595186/4d79c55e.jpg?impolicy=fcrop&w=357&h=201&p=1&q=medium",
      location: "Great location",
      coordinates: { lat: -1.2950, lng: 36.8200 }
    },
    {
      id: 4,
      name: "The Boma Nairobi",
      price: 9655,
      rating: 4.5,
      reviews: 872,
      amenities: ["4-star hotel", "Pool", "Spa", "Restaurant", "Free Wi-Fi"],
      image: "https://www.ahstatic.com/photos/c0d5_ho_00_p_1024x768.jpg",
      location: "Excellent location",
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    {
      id: 5,
      name: "Villa Rosa Kempinski",
      price: 10456,
      rating: 4.8,
      reviews: 1243,
      discount: "15% less than usual",
      amenities: ["5-star hotel", "Pool", "Spa", "Free breakfast", "Free Wi-Fi"],
      image: "https://theexpatmummy.com/wp-content/uploads/2021/02/Radisson-Blu-hotel-Nairobi.jpg",
      location: "Prime location",
      coordinates: { lat: -1.2880, lng: 36.8170 }
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize map
  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) return;
  
    try {
      // Clear previous markers and info windows
      markersRef.current.forEach(marker => marker.setMap(null));
      infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
      markersRef.current = [];
      infoWindowsRef.current = [];
  
      const mapOptions = {
        center: { lat: -1.2921, lng: 36.8219 },
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };
  
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
  
      // Add markers for hotels
      hotels.forEach(hotel => {
        const marker = new window.google.maps.Marker({
          position: hotel.coordinates,
          map: mapInstanceRef.current,
          title: hotel.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#2563EB",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }
        });
  
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${hotel.name}</h3>
              <p style="margin: 5px 0;">KES ${hotel.price.toLocaleString()}</p>
              <p style="margin: 5px 0;">★ ${hotel.rating} (${hotel.reviews} reviews)</p>
              <p style="margin: 5px 0; color: #4B5563;">${hotel.location}</p>
            </div>
          `
        });
  
        marker.addListener('click', () => {
          infoWindowsRef.current.forEach(iw => iw.close());
          infoWindow.open(mapInstanceRef.current, marker);
        });
  
        markersRef.current.push(marker);
        infoWindowsRef.current.push(infoWindow);
      });
  
      // Center map to fit all markers
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(marker => bounds.extend(marker.getPosition()));
      mapInstanceRef.current.fitBounds(bounds);
  
      setLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load Google Maps
    loadGoogleMapsScript(() => {
      if (mapRef.current) {
        initializeMap();
      }
    });

    // Fetch map data from RapidAPI
    const fetchMapData = async () => {
      const options = {
        method: 'POST',
        url: 'https://google-api31.p.rapidapi.com/map',
        headers: {
          'x-rapidapi-key': '28beea17e6mshf30d46e69f7070ap13f5acjsna005b4a18c9b',
          'x-rapidapi-host': 'google-api31.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          text: 'hotels',
          place: 'Nairobi',
          city: 'Nairobi',
          country: 'Kenya',
          latitude: '-1.2921',
          longitude: '36.8219',
          radius: '10000'
        }
      };

      try {
        const response = await axios.request(options);
        setMapData(response.data);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchMapData();

    // Cleanup function
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
      if (infoWindowsRef.current) {
        infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
        infoWindowsRef.current = [];
      }
      mapInstanceRef.current = null;
    };
  }, []);

  const MapSection = () => (
    <div className="w-full lg:w-5/12 relative h-[400px] lg:h-screen">
      <div className="h-full sticky top-0">
        <div ref={mapRef} id="google-map" className="w-full h-full" style={{ minHeight: '400px' }}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div className="text-blue-600">Loading map...</div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4 space-y-2">
          <button className="bg-white px-4 py-2 rounded-lg shadow-md text-sm hover:bg-gray-50 transition-colors duration-200 w-full">
            Update list
          </button>
          <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className={`${
        isHeaderSticky ? 'fixed top-0 left-0 right-0 z-50 border-b shadow-sm' : 'border-b'
      } bg-white transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Search Bar */}
          <div className="flex items-center space-x-3 mb-4 flex-wrap md:flex-nowrap gap-2">
            <div className="flex-1 relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 h-5 w-5" />
              <input
                type="text"
                defaultValue="near Sunton, Nair..."
                className="w-full pl-10 pr-8 py-2.5 border rounded-full text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ✕
              </button>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-full px-4 py-2 bg-blue-50 border-blue-200 whitespace-nowrap">
              <Calendar className="text-blue-500 h-5 w-5" />
              <span className="text-sm">Thu, Nov</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            <div className="flex items-center space-x-2 border rounded-full px-4 py-2 whitespace-nowrap">
              <Calendar className="text-blue-500 h-5 w-5" />
              <span className="text-sm">Fri, Nov 29</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            <div className="flex items-center space-x-2 border rounded-full px-4 py-2 whitespace-nowrap">
              <User2 className="text-blue-500 h-5 w-5" />
              <span className="text-sm">2</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              <span className="text-sm">All filters</span>
            </button>
            
            {filters.map((filter) => (
              <button
                key={filter.id}
                className="flex items-center space-x-2 px-4 py-2 border rounded-full text-sm hover:bg-gray-50 whitespace-nowrap"
              >
                {filter.icon && <filter.icon className="h-4 w-4" />}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Hotel Listings */}
        <div className="w-full lg:w-7/12 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-medium">near Sunton, Nairobi · 138 results</h1>
            </div>
            <button className="text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {hotels.map(hotel => (
              <div key={hotel.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 text-sm rounded">
                      DEAL
                    </div>
                    <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-50">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-blue-600">{hotel.name}</h3>
                        <div className="mt-1 flex items-center space-x-2 flex-wrap">
                        <span className="text-blue-600 font-medium">{hotel.rating}</span>
                          <span className="text-blue-600">({hotel.reviews})</span>
                          <span className="text-gray-600">· {hotel.location}</span>
                        </div>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <div className="text-2xl font-bold">
                          Ksh {hotel.price.toLocaleString()}
                        </div>
                        {hotel.discount && (
                          <div className="text-sm text-green-600">{hotel.discount}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center text-gray-600 text-sm"
                        >
                          {index > 0 && <span className="mx-2 text-gray-300">·</span>}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      View prices
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-2 border rounded-full text-blue-600 hover:bg-blue-50 transition-colors duration-200">
              Next
            </button>
          </div>
          <div className="mt-2 text-center text-gray-600 text-sm">
            Showing results 1 - 12 of 138
          </div>
        </div>

        {/* Map Section */}
        <MapSection />
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t bg-white">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex flex-wrap gap-8 justify-between mb-8">
            <div>
              <div className="text-gray-500 mb-4">Currency · KES</div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-gray-200 rounded-full w-2 h-2"></span>
                <span>Nairobi, Kenya</span>
                <span className="text-gray-500">· Based on your past activity</span>
              </div>
              <button className="text-blue-600 hover:underline">Learn more</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center text-sm mb-4">
            <button className="text-blue-600 hover:underline">About</button>
            <button className="text-blue-600 hover:underline">Privacy</button>
            <button className="text-blue-600 hover:underline">Terms</button>
            <button className="text-blue-600 hover:underline">Join user studies</button>
            <button className="text-blue-600 hover:underline">Feedback</button>
            <button className="text-blue-600 hover:underline">Help Center</button>
          </div>

          <div className="text-sm text-gray-500 text-center">
            Displayed currencies may differ from the currencies used to book properties.
            <button className="text-blue-600 hover:underline ml-1">Learn more</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HotelsPage;