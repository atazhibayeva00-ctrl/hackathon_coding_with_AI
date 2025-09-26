"""
[CONTROLLER] for map-agent Service

PRD REQUIREMENTS:
- Responsible for map rendering and address searches.

MUST IMPLEMENT:
- Logic to take an address string, call an external geocoding service, and return the coordinates.

INTERFACES TO EXPORT:
- search_address(address: str)

IMPORTS NEEDED:
- model.py

BUSINESS RULES:
- Handle cases where the address is not found.

ERROR HANDLING:
- Handle errors from the external geocoding service.

INTEGRATION POINTS:
- index.py (view)
- model.py
"""
