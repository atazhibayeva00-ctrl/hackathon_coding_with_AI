"""
[MODEL] for zillow-agent Service

PRD REQUIREMENTS:
- Fetches rental listings from the Zillow API.

MUST IMPLEMENT:
- Data models for rental listings data.
- Logic to call the external Zillow API using the ZILLOW_API_KEY.

INTERFACES TO EXPORT:
- RentalListing
- call_zillow_api(location: Coordinates) -> RentalListing

IMPORTS NEEDED:
- os to access environment variables for the API key.

BUSINESS RULES:
- None

ERROR HANDLING:
- Handle errors from the external API.

INTEGRATION POINTS:
- controller.py
"""
