"""
[CONTROLLER] for flood-agent Service

PRD REQUIREMENTS:
- Fetches flood risk data.

MUST IMPLEMENT:
- Logic to receive a location, call the external flood risk API, and return the data.
- Use an AI model (llama-3.1-8b-instruct) to interpret the request and the API response.

INTERFACES TO EXPORT:
- get_flood_risk(location: Coordinates)

IMPORTS NEEDED:
- env from the Raindrop runtime.
- model.py

BUSINESS RULES:
- Handle cases where no flood risk data is available for the location.

ERROR HANDLING:
- Handle errors from the external flood risk API.

INTEGRATION POINTS:
- index.py (view)
- model.py
"""
