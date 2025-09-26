"""
[CONTROLLER] for noise-agent Service

PRD REQUIREMENTS:
- Fetches noise pollution data.

MUST IMPLEMENT:
- Logic to receive a location, call the external noise pollution API, and return the data.
- Use an AI model (llama-3.1-8b-instruct) to interpret the request and the API response.

INTERFACES TO EXPORT:
- get_noise_pollution_data(location: Coordinates)

IMPORTS NEEDED:
- env from the Raindrop runtime.
- model.py

BUSINESS RULES:
- Handle cases where no noise pollution data is available for the location.

ERROR HANDLING:
- Handle errors from the external noise pollution API.

INTEGRATION POINTS:
- index.py (view)
- model.py
"""
