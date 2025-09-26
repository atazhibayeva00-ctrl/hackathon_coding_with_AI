"""
[CONTROLLER] for api-gateway Service

PRD REQUIREMENTS:
- The public entry point for the application, routing requests from the frontend to the appropriate agents.

MUST IMPLEMENT:
- Logic to receive a request and delegate it to the correct agent (chat-agent, map-agent, etc.) based on the endpoint.

INTERFACES TO EXPORT:
- handle_chat_request(request)
- handle_map_request(request)

IMPORTS NEEDED:
- env from the Raindrop runtime.

BUSINESS RULES:
- None, this is a simple router.

ERROR HANDLING:
- Handle errors from the downstream agents.

INTEGRATION POINTS:
- chat-agent
- map-agent
- index.py (view)
"""
