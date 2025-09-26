"""
[CONTROLLER] for crime-agent Service

PRD REQUIREMENTS:
- Fetches crime data.

MUST IMPLEMENT:
- Logic to receive a location, call the external crime data API, and return the data.
- Use an AI model (llama-3.1-8b-instruct) to interpret the request and the API response.

INTERFACES TO EXPORT:
- get_crime_data(location: Coordinates)

IMPORTS NEEDED:
- env from the Raindrop runtime.
- model.py

BUSINESS RULES:
- Handle cases where no crime data is available for the location.

ERROR HANDLING:
- Handle errors from the external crime data API.

INTEGRATION POINTS:
- index.py (view)
- model.py
"""
