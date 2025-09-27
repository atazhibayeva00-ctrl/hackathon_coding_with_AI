from flask import Flask, request, jsonify
from unittest.mock import MagicMock

# Mock the Raindrop environment for local development
class MockChatAgent:
    def handle_chat_message(self, message):
        # Simulate a response from the chat agent
        return {"response": f"Chat agent received: {message}"}

class MockMapAgent:
    def search_address(self, address):
        # Simulate a response from the map agent
        return {"coordinates": {"latitude": 34.0522, "longitude": -118.2437}, "address": address}

class MockEnv:
    def __init__(self):
        self.chat_agent = MockChatAgent()
        self.map_agent = MockMapAgent()

env = MockEnv() # Use this mock env for local development

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    data = request.get_json()
    message = data.get('message')
    if not message:
        return jsonify({"error": "Message is required"}), 400
    
    response = env.chat_agent.handle_chat_message(message)
    return jsonify(response)

@app.route('/map', methods=['POST'])
def map_endpoint():
    data = request.get_json()
    address = data.get('address')
    if not address:
        return jsonify({"error": "Address is required"}), 400
    
    response = env.map_agent.search_address(address)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
