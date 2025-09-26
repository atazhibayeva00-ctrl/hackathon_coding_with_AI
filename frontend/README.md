# GeoStats Frontend

A React-based frontend for the GeoStats multi-agent geographic intelligence system, featuring an interactive map with InKeep chat integration.

## Features

- 🗺️ Interactive map with Leaflet
- 🎯 Address search and geocoding
- 📍 Draggable markers and radius selection
- 💬 InKeep chat integration
- 🎤 Voice commands support
- 📊 Developer controls and JSON output
- 📱 Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the environment file and add your API keys:
```bash
cp env.example .env
```

3. Edit `.env` and add your InKeep API key:
```
REACT_APP_INKEEP_API_KEY=your_inkeep_api_key_here
REACT_APP_API_BASE_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

## InKeep Integration

The InKeep chat component is integrated as a floating button in the top-right corner of the map. It connects to your InKeep API endpoint and provides AI-powered chat functionality.

### Configuration

The InKeep chat button is configured in `src/components/InKeepChatButton.tsx`:

```typescript
const buttonProps: InkeepChatButtonProps = {
  aiChatSettings: {
    graphUrl: "https://your-api.example.com/api/chat",
    apiKey: process.env.REACT_APP_INKEEP_API_KEY,
  },
};
```

Update the `graphUrl` to point to your actual InKeep API endpoint.

## Project Structure

```
src/
├── components/
│   └── InKeepChatButton.tsx    # InKeep chat integration
├── App.tsx                     # Main application component
├── App.css                     # App-specific styles
├── main.tsx                    # React entry point
└── index.css                   # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

- Chrome (recommended for voice commands)
- Firefox
- Safari
- Edge

Voice commands require a modern browser with Web Speech API support.
