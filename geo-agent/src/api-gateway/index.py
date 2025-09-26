"""
[VIEW] for api-gateway Service

PRD REQUIREMENTS:
- The public entry point for the application, routing requests from the frontend to the appropriate agents.

MUST IMPLEMENT:
- A Hono-based API router.
- An endpoint to handle chat messages, which will delegate to the chat-agent.
- An endpoint to handle map requests, which will delegate to the map-agent.

INTERFACES TO EXPORT:
- None, this is the main entry point.

IMPORTS NEEDED:
- Hono for the API router.
- env from the Raindrop runtime.

BUSINESS RULES:
- All requests should be validated.

ERROR HANDLING:
- Proper error handling for invalid requests.

INTEGRATION POINTS:
- chat-agent
- map-agent
"""
