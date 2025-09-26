"""
[MODEL] for earthquake-agent Service

PRD REQUIREMENTS:
- Fetches earthquake data.

MUST IMPLEMENT:
- Data models for earthquake data.
- Logic to call the external earthquake API using the EARTHQUAKE_API_KEY.

INTERFACES TO EXPORT:
- EarthquakeData
- call_earthquake_api(location: Coordinates) -> EarthquakeData

IMPORTS NEEDED:
- os to access environment variables for the API key.

BUSINESS RULES:
- None

ERROR HANDLING:
- Handle errors from the external API.

INTEGRATION POINTS:
- controller.py
"""
