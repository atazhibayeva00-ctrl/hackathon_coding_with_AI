"""
[VIEW] for chat-agent Service

PRD REQUIREMENTS:
- The central orchestrator, managing the conversation and delegating to other agents.
- Will use SmartMemory.

MUST IMPLEMENT:
- An endpoint to handle chat messages from the api-gateway.

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
- api-gateway
- controller.py
"""
