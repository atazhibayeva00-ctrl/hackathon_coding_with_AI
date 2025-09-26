import React from 'react';
import { InkeepChatButton, type InkeepChatButtonProps } from "@inkeep/cxkit-react-oss";

const buttonProps: InkeepChatButtonProps = {
  aiChatSettings: {
    graphUrl: "https://your-api.example.com/api/chat",
    apiKey: process.env.REACT_APP_INKEEP_API_KEY, // Your API key
  },
};

const ChatButton: React.FC = () => {
  return <InkeepChatButton {...buttonProps} />;
};

export default ChatButton;
