"""
Shared types and interfaces for the geo-agent application.

PRD REQUIREMENTS:
- Request/Response types used across components.
- Domain entities (User, Order, Session, etc.)
- Event payloads for inter-component communication.

MUST IMPLEMENT:
- Coordinates: A data structure to represent geographical coordinates (latitude and longitude).

INTERFACES TO EXPORT:
- Coordinates

IMPORTS NEEDED:
- None

BUSINESS RULES:
- None

ERROR HANDLING:
- None

INTEGRATION POINTS:
- All agents that need to work with geographical coordinates.
"""

class Coordinates:
    def __init__(self, latitude: float, longitude: float):
        self.latitude = latitude
        self.longitude = longitude

    def to_dict(self):
        return {"latitude": self.latitude, "longitude": self.longitude}

    @staticmethod
    def from_dict(data: dict):
        return Coordinates(data["latitude"], data["longitude"])
