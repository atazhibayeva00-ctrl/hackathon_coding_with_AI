"""
[CONTROLLER] for highway-agent Service

PRD REQUIREMENTS:
- Calculates proximity to highways.

MUST IMPLEMENT:
- Logic to receive a location, call the external highway proximity API, and return the data.
- Use an AI model (llama-3.1-8b-instruct) to interpret the request and the API response.

INTERFACES TO EXPORT:
- get_highway_proximity(location: Coordinates)

IMPORTS NEEDED:
- env from the Raindrop runtime.
- model.py

BUSINESS RULES:
- Handle cases where no highway proximity data is available for the location.

ERROR HANDLING:
- Handle errors from the external highway proximity API.

INTEGRATION POINTS:
- index.py (view)
- model.py
"""
