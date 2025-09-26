import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ChatButton from './components/InKeepChatButton';
import './App.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Coordinates {
  lat: number;
  lng: number;
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates>({ lat: 37.7749, lng: -122.4194 });
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(1.0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isDevPanelCollapsed, setIsDevPanelCollapsed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('San Francisco, CA');
  const [jsonOutput, setJsonOutput] = useState('Click "Generate Report" to see JSON output...');
  
  const chatOutputRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        addChatMessage('You', transcript);
        setChatInput('');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        addChatMessage('GeoAgent', 'Sorry, I had trouble hearing you. Please try again.');
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll chat output
  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const addChatMessage = (sender: string, message: string) => {
    const newMessage: ChatMessage = {
      sender,
      message,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const searchAddress = async (query: string) => {
    if (!query.trim()) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const results = await response.json();

      if (results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lng = parseFloat(results[0].lon);
        const displayName = results[0].display_name;

        setCurrentLocation({ lat, lng });
        setCurrentAddress(displayName);
        addChatMessage('GeoStats', `Found location: ${displayName}`);
      } else {
        addChatMessage('GeoStats', 'Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Search error:', error);
      addChatMessage('GeoStats', 'Search error. Please try again.');
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const result = await response.json();

      if (result.address) {
        const parts = [];
        if (result.address.road) parts.push(result.address.road);
        if (result.address.city) parts.push(result.address.city);
        if (result.address.postcode) parts.push(result.address.postcode);
        if (result.address.country) parts.push(result.address.country);
        return parts.join(', ') || 'Address not found';
      }
      return 'Address not found';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Address not available';
    }
  };

  const handleSearch = () => {
    searchAddress(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.target === document.getElementById('search-input')) {
        handleSearch();
      } else if (e.target === document.getElementById('chat-input')) {
        handleChatSubmit();
      }
    }
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      addChatMessage('You', chatInput);
      setChatInput('');
      
      // Simple response for demonstration
      setTimeout(() => {
        addChatMessage('GeoAgent', 'I received your message. This will be connected to the InKeep chat system.');
      }, 500);
    }
  };

  const handleVoiceCommand = () => {
    if (!recognitionRef.current) {
      addChatMessage('GeoAgent', 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSearchRent = () => {
    addChatMessage('GeoStats', `Searching for rental properties near ${currentAddress} within ${radius} miles...`);
    // TODO: Integrate with backend API
  };

  const handleSearchBuy = () => {
    addChatMessage('GeoStats', `Searching for properties for sale near ${currentAddress} within ${radius} miles...`);
    // TODO: Integrate with backend API
  };

  const handleGenerateReport = () => {
    const payload = {
      coordinates: currentLocation,
      address: currentAddress,
      radius: radius,
      chatHistory: chatMessages.map(msg => `${msg.sender}: ${msg.message}`),
      timestamp: new Date().toISOString()
    };

    setJsonOutput(JSON.stringify(payload, null, 2));
    addChatMessage('GeoStats', 'Report generated! Check the JSON output below.');
  };

  const MapEvents = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setCurrentLocation({ lat, lng });
        const address = await reverseGeocode(lat, lng);
        setCurrentAddress(address);
        addChatMessage('GeoStats', `Location updated to: ${address}`);
      }
    });
    return null;
  };

  return (
    <div className="app">
      {/* Map Container */}
      <div className="map-container">
        <MapContainer
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          <Marker position={[currentLocation.lat, currentLocation.lng]} />
          <Circle
            center={[currentLocation.lat, currentLocation.lng]}
            radius={radius * 1609.34} // Convert miles to meters
            color="#2196F3"
            fillColor="#2196F3"
            fillOpacity={0.1}
          />
          <MapEvents />
        </MapContainer>
      </div>

      {/* Top Search Overlay */}
      <div className="top-overlay">
        <div className="search-container">
          <input
            id="search-input"
            type="text"
            placeholder="Search for address, city, or postcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
          <button
            onClick={handleVoiceCommand}
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            title="Voice commands"
          >
            🎤
          </button>
        </div>
      </div>

      {/* InKeep Chat Button - Positioned in top right */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <ChatButton />
      </div>

      {/* Bottom Dev Panel */}
      <div className={`bottom-dev-panel ${isDevPanelCollapsed ? 'collapsed' : ''}`}>
        <div className="dev-panel-header" onClick={() => setIsDevPanelCollapsed(!isDevPanelCollapsed)}>
          <span>🔧 Developer Controls</span>
          <button className="dev-panel-toggle">
            {isDevPanelCollapsed ? '▼' : '▲'}
          </button>
        </div>
        <div className={`dev-panel-content ${isDevPanelCollapsed ? 'collapsed' : ''}`}>
          <div className="coordinates-display">
            <strong>Current Location:</strong> <span>({currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}) {currentAddress}</span>
          </div>
          
          <div className="radius-control">
            <label htmlFor="radius-slider">
              Search Radius: <span>{radius.toFixed(1)}</span> miles
            </label>
            <input
              id="radius-slider"
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="radius-slider"
            />
          </div>
          
          <div className="action-buttons">
            <button onClick={handleSearchRent} className="action-btn secondary">
              Search Rent
            </button>
            <button onClick={handleSearchBuy} className="action-btn secondary">
              Search Buy
            </button>
            <button onClick={handleGenerateReport} className="action-btn tertiary">
              Generate Report
            </button>
          </div>
          
          <div className="chat-section">
            <div ref={chatOutputRef} className="chat-output">
              {chatMessages.map((msg, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <strong>{msg.sender}:</strong> {msg.message}
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                id="chat-input"
                type="text"
                placeholder="How can I help you today?"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
              />
              <button
                onClick={handleVoiceCommand}
                className={`mic-btn ${isListening ? 'listening' : ''}`}
                title="Click to speak"
              >
                🎤
              </button>
            </div>
          </div>
          
          <div className="json-output-section">
            <h4>JSON Output:</h4>
            <pre className="json-output">{jsonOutput}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
