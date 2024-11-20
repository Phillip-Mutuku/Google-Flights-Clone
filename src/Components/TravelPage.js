import React, { useState } from 'react';
import { Search, Globe, Plane, Hotel, Home } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import HomeBg from '../media/home-bg.png';


const TravelPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularDestinations = [
    {
      id: 1,
      city: 'Cape Town',
      dates: 'Apr 17 - 24, 2025',
      attractions: 'Table Mountain, Robben Island & beaches',
      flightPrice: 'KES 66,595',
      hotelPrice: 'KES 10,266',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7DC3Ra87r86OFEiCyuppijD2QKBnTde3Oow&s',
      coordinates: { lat: -33.9249, lng: 18.4241 }
    },
    {
      id: 2,
      city: 'London',
      dates: 'Mar 16 - 24, 2025',
      attractions: 'Buckingham Palace & British Museum',
      flightPrice: 'KES 82,630',
      hotelPrice: 'KES 18,047',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQha0iCirK8Amd226DToY1avDKtujr2-HRvlw&s',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
      id: 3,
      city: 'Bali',
      dates: 'Nov 28 - Dec 6 · To Denpasar',
      attractions: 'Beach, honeymoon, surfing, temple, and rafting',
      flightPrice: 'KES 62,477',
      hotelPrice: 'KES 4,134',
      image: 'https://www.torntackies.com/wp-content/uploads/2021/01/Bali-itinerary-for-3-weeks.jpg',
      coordinates: { lat: -8.3405, lng: 115.0920 }
    }
  ];

  const MapComponent = () => {
    const mapStyles = {
      height: "100%",
      width: "100%"
    };
    
    const defaultCenter = {
      lat: 0,
      lng: 20
    };

    const mapOptions = {
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ lightness: 100 }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        }
      ],
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    };

    return (
      <LoadScript googleMapsApiKey="AIzaSyAp-jUCpNfP31a4JTl5LXzNObY_zj3RNfU">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={2}
          center={defaultCenter}
          options={mapOptions}
        >
          {popularDestinations.map((destination) => (
            <Marker
              key={destination.id}
              position={destination.coordinates}
              title={destination.city}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  };

  const NavItem = ({ icon, label }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
        {icon}
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );

  const DestinationCard = ({ city, dates, attractions, flightPrice, hotelPrice, image }) => (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <img src={image} alt={city} className="w-48 h-36 object-cover" />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-medium text-gray-900">{city}</h3>
            <p className="text-sm text-gray-600">{dates}</p>
            <p className="text-sm text-gray-600 mt-1">{attractions}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <Plane className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{flightPrice}</span>
            </div>
            <div className="flex items-center justify-end space-x-2 mt-1">
              <Hotel className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{hotelPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FooterLink = ({ href, label }) => (
    <a href={href} className="text-sm text-blue-500 hover:underline">
      {label}
    </a>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-blue-50" style={{ backgroundImage: `url(${HomeBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-6xl font-normal text-gray-900">Travel</h1>
            
            {/* Search Bar */}
            <div className="relative w-[600px] mx-auto">
              <input
                type="text"
                className="w-full px-12 py-4 rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for flights, hotels and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Navigation Icons */}
            <div className="flex justify-center space-x-16 pt-8">
              <NavItem icon={<Globe className="w-6 h-6" />} label="Explore" />
              <NavItem icon={<Plane className="w-6 h-6" />} label="Flights" />
              <NavItem icon={<Hotel className="w-6 h-6" />} label="Hotels" />
              <NavItem icon={<Home className="w-6 h-6" />} label="Vacation rentals" />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-2xl font-normal text-gray-900">Popular destinations</h2>
          <span className="text-sm text-gray-500">Based on your location in Nairobi</span>
          <button className="ml-1">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Destinations List */}
          <div className="space-y-4">
            {popularDestinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>

          {/* Map */}
          <div className="bg-blue-50 rounded-lg h-[600px] relative">
            <MapComponent />
            <div className="absolute top-4 right-4">
              <button className="bg-white p-2 rounded shadow hover:shadow-md transition-shadow duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap space-x-6 text-blue-500">
            <FooterLink href="#" label="About" />
            <FooterLink href="#" label="Privacy" />
            <FooterLink href="#" label="Terms" />
            <FooterLink href="#" label="Join user studies" />
            <FooterLink href="#" label="Feedback" />
            <FooterLink href="#" label="Help Center" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelPage;