// Initialize the map
const map = L.map('map').setView([37.7749, -122.4194], 13); // San Francisco coordinates

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// Add a draggable marker at the center
let currentMarker = L.marker([37.7749, -122.4194], {draggable: true}).addTo(map);
currentMarker.bindPopup('<b>San Francisco</b><br>Welcome to GeoStats!<br><i>Drag me to move!</i>').openPopup();

// Add radius circle
let radiusCircle = L.circle([37.7749, -122.4194], {
    color: '#2196F3',
    fillColor: '#2196F3',
    fillOpacity: 0.1,
    radius: 1609.34 // 1 mile in meters
}).addTo(map);

// Initialize coordinates display for starting location
updateCoordinatesDisplay(37.7749, -122.4194);

// Geocoding function using Nominatim
async function searchAddress(query) {
    if (!query.trim()) return;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        const results = await response.json();

        if (results.length > 0) {
            const lat = parseFloat(results[0].lat);
            const lon = parseFloat(results[0].lon);
            const displayName = results[0].display_name;

            // Move map to location
            map.setView([lat, lon], 15);

            // Update coordinates display
            updateCoordinatesDisplay(lat, lon);

            // Update radius circle position
            radiusCircle.setLatLng([lat, lon]);

            // Remove old marker and add new one
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            currentMarker = L.marker([lat, lon], {draggable: true}).addTo(map);
            currentMarker.bindPopup(`<b>Found:</b><br>${displayName}<br><i>Drag me to move!</i>`).openPopup();

            // Add drag event listener to new marker
            addMarkerDragListener();
        } else {
            addChatMessage('GeoStats', 'Location not found. Please try a different search term.');
        }
    } catch (error) {
        console.error('Search error:', error);
        addChatMessage('GeoStats', 'Search error. Please try again.');
    }
}

// Reverse geocoding function
async function reverseGeocode(lat, lng) {
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
}

// Function to update coordinates display
function updateCoordinatesDisplay(lat, lng) {
    const coordsElement = document.getElementById('current-coords');
    coordsElement.textContent = `(${lat.toFixed(2)}, ${lng.toFixed(2)})`;

    // Get address asynchronously
    reverseGeocode(lat, lng).then(address => {
        coordsElement.textContent = `(${lat.toFixed(2)}, ${lng.toFixed(2)}) ${address}`;
    });
}

// Function to add drag listener to marker
function addMarkerDragListener() {
    currentMarker.on('dragend', function(e) {
        const position = e.target.getLatLng();
        const lat = position.lat;
        const lng = position.lng;

        // Update coordinates display
        updateCoordinatesDisplay(lat, lng);

        // Update radius circle position
        radiusCircle.setLatLng([lat, lng]);

        // Update popup with new coordinates
        currentMarker.bindPopup(`<b>Current Location</b><br>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}<br><i>Drag me to move!</i>`);
    });
}

// Add drag listener to initial marker
addMarkerDragListener();

// Search functionality
const addressSearch = document.getElementById('address-search');
const searchBtn = document.getElementById('search-btn');

// Handle search button click
searchBtn.addEventListener('click', function() {
    const query = addressSearch.value.trim();
    if (query) {
        searchAddress(query);
    }
});

// Handle Enter key in search input
addressSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = addressSearch.value.trim();
        if (query) {
            searchAddress(query);
        }
    }
});

// Radius slider functionality
const radiusSlider = document.getElementById('radius-slider');
const radiusValue = document.getElementById('radius-value');

radiusSlider.addEventListener('input', function() {
    const radiusMiles = parseFloat(radiusSlider.value);
    const radiusMeters = radiusMiles * 1609.34; // Convert miles to meters

    // Update the display
    radiusValue.textContent = radiusMiles.toFixed(1);

    // Update the circle radius
    radiusCircle.setRadius(radiusMeters);
});

// Search buttons functionality
const searchRentBtn = document.getElementById('search-rent-btn');
const searchBuyBtn = document.getElementById('search-buy-btn');

searchRentBtn.addEventListener('click', function() {
    const position = currentMarker.getLatLng();
    const radiusMiles = parseFloat(radiusSlider.value);

    console.log('Search Rent clicked!');
    console.log('Center:', position);
    console.log('Radius:', radiusMiles, 'miles');

    // TODO: Call RentSpice API for rentals
    // const searchParams = { lat: position.lat, lng: position.lng, radius: radiusMiles, type: 'rent' };
});

searchBuyBtn.addEventListener('click', function() {
    const position = currentMarker.getLatLng();
    const radiusMiles = parseFloat(radiusSlider.value);

    console.log('Search Buy clicked!');
    console.log('Center:', position);
    console.log('Radius:', radiusMiles, 'miles');

    // TODO: Call RentSpice API for sales
    // const searchParams = { lat: position.lat, lng: position.lng, radius: radiusMiles, type: 'buy' };
});

// Generate Report functionality
const generateReportBtn = document.getElementById('generate-report-btn');

generateReportBtn.addEventListener('click', function() {
    // Get current coordinates
    const position = currentMarker.getLatLng();
    const coords = {
        lat: position.lat,
        lng: position.lng
    };

    // Get chat history
    const chatHistory = getChatHistory();

    // Create payload for backend
    const payload = {
        coordinates: coords,
        chatHistory: chatHistory,
        timestamp: new Date().toISOString()
    };

    // Display in dev panel
    const jsonOutput = document.getElementById('json-output');
    jsonOutput.textContent = JSON.stringify(payload, null, 2);

    // Expand dev panel if collapsed
    if (devPanel.classList.contains('collapsed')) {
        devPanelHeader.click();
    }

    // Also console.log for backup
    console.log('Generate Report clicked!');
    console.log('Payload:', payload);

    // TODO: Send to backend API
    // fetch('/api/generate-report', { method: 'POST', body: JSON.stringify(payload) })
});

// Function to get chat history
function getChatHistory() {
    const chatOutput = document.getElementById('chat-output');
    const messages = [];

    // Extract all chat messages
    Array.from(chatOutput.children).forEach(messageDiv => {
        const text = messageDiv.textContent || messageDiv.innerText;
        messages.push(text);
    });

    return messages;
}

// Bottom dev panel functionality
const devPanelHeader = document.getElementById('dev-panel-header');
const devPanel = document.getElementById('bottom-dev-panel');
const devPanelToggle = document.getElementById('dev-panel-toggle');

// Start with panel collapsed
devPanel.classList.add('collapsed');

devPanelHeader.addEventListener('click', function() {
    devPanel.classList.toggle('collapsed');
    if (devPanel.classList.contains('collapsed')) {
        devPanelToggle.textContent = '▲';
    } else {
        devPanelToggle.textContent = '▼';
    }
});

// Speech recognition setup
let recognition = null;
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        isListening = true;
        const micBtn = document.getElementById('mic-btn');
        micBtn.classList.add('listening');
        micBtn.textContent = '🔴';
        micBtn.title = 'Listening... Click to stop';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const chatInput = document.getElementById('chat-input');
        chatInput.value = transcript;

        // Automatically send the message
        if (transcript.trim()) {
            addChatMessage('You', transcript);
            chatInput.value = '';

            // Simple response for demonstration
            setTimeout(() => {
                addChatMessage('GeoAgent', 'cool story bro');
            }, 500);
        }
    };

    recognition.onend = function() {
        isListening = false;
        const micBtn = document.getElementById('mic-btn');
        micBtn.classList.remove('listening');
        micBtn.textContent = '🎤';
        micBtn.title = 'Click to speak';
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        addChatMessage('GeoAgent', 'Sorry, I had trouble hearing you. Please try again.');
        recognition.stop();
    };
}

// Voice button functionality (top overlay)
const voiceBtn = document.getElementById('voice-btn');

voiceBtn.addEventListener('click', function() {
    if (!recognition) {
        alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        return;
    }

    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

// Update voice button state
if (recognition) {
    recognition.onstart = function() {
        isListening = true;
        voiceBtn.classList.add('listening');
        voiceBtn.textContent = '🔴';
        voiceBtn.title = 'Listening... Click to stop';

        // Also update chat mic button if exists
        const micBtn = document.getElementById('mic-btn');
        if (micBtn) {
            micBtn.classList.add('listening');
            micBtn.textContent = '🔴';
        }
    };

    recognition.onend = function() {
        isListening = false;
        voiceBtn.classList.remove('listening');
        voiceBtn.textContent = '🎤';
        voiceBtn.title = 'Voice commands';

        // Also update chat mic button if exists
        const micBtn = document.getElementById('mic-btn');
        if (micBtn) {
            micBtn.classList.remove('listening');
            micBtn.textContent = '🎤';
        }
    };
}

// Basic chat functionality
const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');
const micBtn = document.getElementById('mic-btn');

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const message = chatInput.value.trim();
        if (message) {
            addChatMessage('You', message);
            chatInput.value = '';

            // Simple response for demonstration
            setTimeout(() => {
                addChatMessage('GeoAgent', 'cool story bro');
            }, 500);
        }
    }
});

// Microphone button functionality
micBtn.addEventListener('click', function() {
    if (!recognition) {
        addChatMessage('GeoAgent', 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        return;
    }

    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

function addChatMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messageDiv.style.marginBottom = '10px';
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
