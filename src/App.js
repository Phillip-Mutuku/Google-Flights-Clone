import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, Grid, Moon, X, Home, Search, MapPin, Settings, 
  MessageCircle, HelpCircle, Camera, ChevronDown 
} from 'lucide-react';

// Import your page components
import TravelPage from './Components/TravelPage';
import FlightsPage from './Components/FlightsPage';
import ExplorePage from './Components/explorePage';
import HotelsPage from './Components/HotelsPage';
import RentalSearchPage from './Components/RentalSearchPage';
import FlightSettings from './Components/FlightSettings';
import HelpPage from './Components/HelpPage';

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showMoreAccounts, setShowMoreAccounts] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    'Afrikaans', 'Bosanski', 'Català', 'Čeština', 'Dansk', 'Deutsch', 
    'Eesti', 'English (United Kingdom)', 'English (United States)', 'Español',
    'Français', 'Italiano', 'Nederlands', 'Polski', 'Português', 'Română'
  ];

  const currencies = [
    { name: 'British Pound', code: 'GBP' },
    { name: 'Euro', code: 'EUR' },
    { name: 'Japanese Yen', code: 'JPY' },
    { name: 'US Dollar', code: 'USD' },
    { name: 'Albanian Lek', code: 'ALL' },
    { name: 'Algerian Dinar', code: 'DZD' }
  ];

  const locations = [
    'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
    'Kuwait', 'Kyrgyzstan', 'Laos'
  ];

  const navLinks = [
    { to: "/travel", icon: "🧳", text: "Travel", color: "text-blue-600"},
    { to: "/explore", icon: "🔍", text: "Explore", color: "text-blue-600" },
    { to: "/", icon: "✈️", text: "Flights", color: "text-blue-600" },
    { to: "/hotels", icon: "🏨", text: "Hotels", color: "text-blue-600" },
    { to: "/rentals", icon: "🏠", text: "Vacation rentals", color: "text-blue-600" }
  ];

  const sidebarLinks = [
    { 
      text: 'Change language', 
      icon: <Settings className="w-5 h-5" />, 
      onClick: () => setShowLanguageModal(true) 
    },
    { 
      text: 'Change currency', 
      icon: <Settings className="w-5 h-5" />, 
      onClick: () => setShowCurrencyModal(true) 
    },
    { 
      text: 'Change location', 
      icon: <MapPin className="w-5 h-5" />, 
      onClick: () => setShowLocationModal(true) 
    },
    { 
      text: 'Flights settings', 
      icon: <Settings className="w-5 h-5" />, 
      onClick: () => navigate('/settings')
    },
    { 
      text: 'Help', 
      icon: <HelpCircle className="w-5 h-5" />, 
      onClick: () => navigate('/help')
    },
    { 
      text: 'Feedback', 
      icon: <MessageCircle className="w-5 h-5" />, 
      onClick: () => setShowFeedbackModal(true)
    }
  ];

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-trigger')) {
        setShowProfile(false);
      }
      if (!event.target.closest('.theme-menu') && !event.target.closest('.theme-trigger')) {
        setShowThemeMenu(false);
      }
      if (!event.target.closest('.modal-content') && !event.target.closest('.modal-trigger')) {
        setShowLanguageModal(false);
        setShowCurrencyModal(false);
        setShowLocationModal(false);
      }
      if (!event.target.closest('.feedback-modal') && !event.target.closest('.feedback-trigger')) {
        setShowFeedbackModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-lg w-96 modal-content max-w-[90vw] mx-4">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FeedbackModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="fixed right-4 top-14 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50 feedback-modal max-w-[calc(100vw-2rem)] mx-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">Send feedback to Google</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-lg mb-2 text-gray-800 dark:text-gray-200">
                Describe your feedback
              </label>
              <textarea
                className="w-full h-32 p-2 border rounded-lg resize-none dark:bg-gray-800 dark:border-gray-700"
                placeholder="Tell us what prompted this feedback..."
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Please don't include any sensitive information
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <Camera className="w-12 h-12 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Click to add a screenshot
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can also mark your area of concern or hide info using Edit tool.
                  </p>
                </div>
              </div>
              <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded">
                Capture screenshot
              </button>
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                We may email you for more information or updates
              </span>
            </label>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Some account and system information may be sent to Google.</p>
              <p className="mt-1">
                We will use it to fix problems and improve our services, subject to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={onClose}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-max">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <img 
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png"
              alt="Google"
              className="h-6 object-contain"
            />
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}>
              <button className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors border
                ${location.pathname === link.to
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-600' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700'}`}
              >
                <span className={link.color}>{link.icon}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{link.text}</span>
              </button>
            </Link>
          ))}
        </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors theme-trigger"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
            >
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Grid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              className="ml-2 relative profile-trigger"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img 
                src="https://www.wikihow.com/images/thumb/9/90/What_type_of_person_are_you_quiz_pic.png/728px-What_type_of_person_are_you_quiz_pic.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="flex justify-around py-2">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="flex flex-col items-center">
              <span className="text-xl">{link.icon}</span>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{link.text}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed top-[57px] left-0 h-[calc(100vh-57px)] z-30 transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-64 h-full bg-white dark:bg-gray-900 shadow-lg overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Main Navigation Links */}
            {navLinks.map(link => (
              <div
                key={link.to}
                onClick={() => handleNavigation(link.to)}
                className={`flex items-center space-x-4 p-2 rounded-full transition-colors cursor-pointer
                  ${location.pathname === link.to
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                <span className="text-gray-800 dark:text-gray-200">{link.icon}</span>
                <span>{link.text}</span>
              </div>
            ))}
            
            <hr className="dark:border-gray-700" />
            
            {/* Settings Links */}
            {sidebarLinks.map(link => (
              <div
                key={link.text}
                onClick={link.onClick}
                className="flex items-center space-x-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <span className="text-gray-800 dark:text-gray-200">{link.icon}</span>
                <span className="text-gray-700 dark:text-gray-300">{link.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      {showProfile && (
        <div className="fixed right-4 top-14 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50 profile-menu max-w-[calc(100vw-2rem)] mx-4">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">example@gmail.com</span>
              <button onClick={() => setShowProfile(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <img 
                  src="https://www.wikihow.com/images/thumb/9/90/What_type_of_person_are_you_quiz_pic.png/728px-What_type_of_person_are_you_quiz_pic.png"
                  alt="Profile"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <button className="absolute bottom-2 right-0 w-6 h-6 bg-white rounded-full border border-gray-300 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h2 className="text-xl font-normal mb-2 text-gray-800 dark:text-gray-200">Hi, User!</h2>
              <button className="w-full py-2 px-4 rounded-full border border-gray-300 text-blue-600 hover:bg-blue-50 transition-colors">
                Manage your Account
              </button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <Home className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-800 dark:text-gray-200 mb-2">
                    Set a home address in your account for more relevant search results
                  </p>
                  <div className="flex gap-4">
                    <button className="text-blue-600 hover:text-blue-700">Dismiss</button>
                    <button className="text-blue-600 hover:text-blue-700">Set home address</button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button 
                className="w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setShowMoreAccounts(!showMoreAccounts)}
              >
                <span className="text-gray-700 dark:text-gray-300">
                  {showMoreAccounts ? 'Hide' : 'Show'} more accounts
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  showMoreAccounts ? 'rotate-180' : ''
                }`} />
              </button>
              
              {showMoreAccounts && (
                <div className="mt-2 space-y-2">
                  {[
                    { initial: 'U', name: 'User Two', email: 'user2@gmail.com', color: 'bg-green-700' },
                    { initial: 'U', name: 'User Three', email: 'user3@gmail.com', color: 'bg-blue-700' }
                  ].map((account, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                      <div className={`w-8 h-8 ${account.color} rounded-full flex items-center justify-center text-white`}>
                        {account.initial}
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-gray-200">{account.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{account.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Theme Menu */}
      {showThemeMenu && (
        <div className="fixed right-16 top-14 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 theme-menu">
          {['Use device default', 'Dark theme', 'Light theme'].map((option) => (
            <button
              key={option}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              onClick={() => {
                setTheme(option.toLowerCase().split(' ')[0]);
                setShowThemeMenu(false);
              }}
            >
              {option}
              {theme === option.toLowerCase().split(' ')[0] && <span className="ml-2">✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Language Modal */}
      <Modal
        show={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title="Select your language"
      >
        <div className="space-y-2">
          {languages.map((lang) => (
            <div
              key={lang}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
            >
              <input type="radio" name="language" className="w-4 h-4" />
              <span className="text-gray-700 dark:text-gray-300">{lang}</span>
            </div>
          ))}
        </div>
      </Modal>

      {/* Currency Modal */}
      <Modal
        show={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        title="Select your currency"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested currencies</h3>
            {currencies.slice(0, 4).map((currency) => (
              <div
                key={currency.code}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
              >
                <input type="radio" name="currency" className="w-4 h-4" />
                <div>
                  <div className="text-gray-700 dark:text-gray-300">{currency.name}</div>
                  <div className="text-sm text-gray-500">{currency.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">All currencies</h3>
            {currencies.slice(4).map((currency) => (
              <div
                key={currency.code}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
              >
                <input type="radio" name="currency" className="w-4 h-4" />
                <div>
                  <div className="text-gray-700 dark:text-gray-300">{currency.name}</div>
                  <div className="text-sm text-gray-500">{currency.code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Location Modal */}
      <Modal
        show={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        title="Select your location"
      >
        <div className="space-y-2">
          {locations.map((loc) => (
            <div
              key={loc}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
            >
              <input type="radio" name="location" className="w-4 h-4" />
              <span className="text-gray-700 dark:text-gray-300">{loc}</span>
            </div>
          ))}
        </div>
      </Modal>

      {/* Feedback Modal */}
      <FeedbackModal show={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />

      {/* Main Content */}
      <main className="pt-14 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<FlightsPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/rentals" element={<RentalSearchPage />} />
          <Route path="/settings" element={<FlightSettings />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;