"""
[CONTROLLER] for zillow-agent Service

PRD REQUIREMENTS:
- Fetches rental listings from the Zillow API.

MUST IMPLEMENT:
- Logic to receive a location, call the external Zillow API, and return the data.
- Use an AI model (llama-3.1-8b-instruct) to interpret the request and the API response.

INTERFACES TO EXPORT:
- get_rental_listings(location: Coordinates)

IMPORTS NEEDED:
- env from the Raindrop runtime.
- model.py

BUSINESS RULES:
- Handle cases where no rental listings are available for the location.

ERROR HANDLING:
- Handle errors from the external Zillow API.

INTEGRATION POINTS:
- index.py (view)
- model.py
"""
