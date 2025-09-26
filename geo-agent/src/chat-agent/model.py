"""
[MODEL] for chat-agent Service

PRD REQUIREMENTS:
- The central orchestrator, managing the conversation and delegating to other agents.
- Will use SmartMemory.

MUST IMPLEMENT:
- Data models for chat messages and conversation state.
- Logic to interact with SmartMemory to save and load conversation history.

INTERFACES TO EXPORT:
- ChatMessage
- ConversationState
- save_to_memory(state: ConversationState)
- load_from_memory() -> ConversationState

IMPORTS NEEDED:
- env from the Raindrop runtime.

BUSINESS RULES:
- None

ERROR HANDLING:
- Handle errors from SmartMemory.

INTEGRATION POINTS:
- controller.py
"""
