"""
[MODEL] for crime-agent Service

PRD REQUIREMENTS:
- Fetches crime data.

MUST IMPLEMENT:
- Data models for crime data.
- Logic to call the external crime data API using the CRIME_API_KEY.

INTERFACES TO EXPORT:
- CrimeData
- call_crime_api(location: Coordinates) -> CrimeData

IMPORTS NEEDED:
- os to access environment variables for the API key.

BUSINESS RULES:
- None

ERROR HANDLING:
- Handle errors from the external API.

INTEGRATION POINTS:
- controller.py
"""
