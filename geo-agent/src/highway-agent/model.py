"""
[MODEL] for highway-agent Service

PRD REQUIREMENTS:
- Calculates proximity to highways.

MUST IMPLEMENT:
- Data models for highway proximity data.
- Logic to call the external highway proximity API using the HIGHWAY_API_KEY.

INTERFACES TO EXPORT:
- HighwayProximityData
- call_highway_api(location: Coordinates) -> HighwayProximityData

IMPORTS NEEDED:
- os to access environment variables for the API key.

BUSINESS RULES:
- None

ERROR HANDLING:
- Handle errors from the external API.

INTEGRATION POINTS:
- controller.py
"""
