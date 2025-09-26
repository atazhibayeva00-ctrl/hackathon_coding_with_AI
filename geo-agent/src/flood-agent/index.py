"""
[VIEW] for flood-agent Service

PRD REQUIREMENTS:
- Fetches flood risk data.

MUST IMPLEMENT:
- An endpoint to handle requests for flood risk data for a specific location.

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
