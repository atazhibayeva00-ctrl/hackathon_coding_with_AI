"""
[VIEW] for highway-agent Service

PRD REQUIREMENTS:
- Calculates proximity to highways.

MUST IMPLEMENT:
- An endpoint to handle requests for highway proximity for a specific location.

INTERFACES TO EXPORT:
- None, this is the main entry point for the service.

IMPORTS NEEDED:
- Hono for the API router.
- env from the Raindrop runtime.
- controller.py

BUSINESS RULES:
- All requests should be validated.

ERROR HANDLING:
- Proper error handling for invalid requests.

INTEGRATION POINTS:
- chat-agent
- controller.py
"""
