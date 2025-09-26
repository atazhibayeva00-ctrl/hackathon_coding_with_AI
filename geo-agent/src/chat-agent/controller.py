"""
[CONTROLLER] for chat-agent Service

PRD REQUIREMENTS:
- The central orchestrator, managing the conversation and delegating to other agents.
- Will use SmartMemory.

MUST IMPLEMENT:
- Logic to receive a user's message, understand the intent using an AI model (deepseek-v3).
- Delegate tasks to the appropriate specialized agents (map-agent, crime-agent, etc.).
- Store and retrieve conversation history using SmartMemory.

INTERFACES TO EXPORT:
- handle_chat_message(message: str)

IMPORTS NEEDED:
- env from the Raindrop runtime.
- model.py

BUSINESS RULES:
- If the user's intent is unclear, ask for clarification.

ERROR HANDLING:
- Handle errors from the downstream agents.

INTEGRATION POINTS:
- index.py (view)
- model.py
- map-agent
- crime-agent
- flood-agent
- earthquake-agent
- noise-agent
- highway-agent
- zillow-agent
"""
