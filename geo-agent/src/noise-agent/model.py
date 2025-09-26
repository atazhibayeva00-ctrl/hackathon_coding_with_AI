"""
[MODEL] for noise-agent Service

PRD REQUIREMENTS:
- Fetches noise pollution data.

MUST IMPLEMENT:
- Data models for noise pollution data.
- Logic to call the external noise pollution API using the NOISE_API_KEY.

INTERFACES TO EXPORT:
- NoisePollutionData
- call_noise_api(location: Coordinates) -> NoisePollutionData

IMPORTS NEEDED:
- os to access environment variables for the API key.

BUSINESS RULES:
- None

ERROR HANDLING:
- Handle errors from the external API.

INTEGRATION POINTS:
- controller.py
"""
