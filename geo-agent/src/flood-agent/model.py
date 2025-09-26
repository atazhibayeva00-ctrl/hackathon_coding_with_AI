"""
[MODEL] for flood-agent Service

PRD REQUIREMENTS:
- Fetches flood risk data.

MUST IMPLEMENT:
- Data models for flood risk data.
- Logic to call the external flood risk API using the FLOOD_API_KEY.

INTERFACES TO EXPORT:
- FloodRiskData
- call_flood_api(location: Coordinates) -> FloodRiskData

IMPORTS NEEDED:
- os to access environment variables for the API key.

BUSINESS RULES:
- None

ERROR HANDLING:
- Handle errors from the external API.

INTEGRATION POINTS:
- controller.py
"""
