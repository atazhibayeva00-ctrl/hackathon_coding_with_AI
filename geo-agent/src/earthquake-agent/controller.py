"""
[CONTROLLER] for earthquake-agent Service

PRD REQUIREMENTS:
- Fetches earthquake data.

MUST IMPLEMENT:
- Logic to receive a location, call the external earthquake API, and return the data.
- Use an AI model (llama-3.1-8b-instruct) to interpret the request and the API response.

INTERFACES TO EXPORT:
- get_earthquake_data(location: Coordinates)

IMPORTS NEEDED:
- env from the Raindrop runtime.
- model.py

BUSINESS RULES:
- Handle cases where no earthquake data is available for the location.

ERROR HANDLING:
- Handle errors from the external earthquake API.

INTEGRATION POINTS:
- index.py (view)
- model.py
"""
