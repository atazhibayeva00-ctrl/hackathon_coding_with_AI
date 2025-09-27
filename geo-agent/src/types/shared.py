"""
Shared types and interfaces for the geo-agent application.

This file will be updated when InKeep agent definitions are implemented.
For now, keeping only the basic Coordinates structure.
"""

from dataclasses import dataclass

@dataclass
class Coordinates:
    latitude: float
    longitude: float
    
    def to_dict(self):
        return {"latitude": self.latitude, "longitude": self.longitude}

    @staticmethod
    def from_dict(data: dict):
        return Coordinates(data["latitude"], data["longitude"])
