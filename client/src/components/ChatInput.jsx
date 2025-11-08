import React from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  handleSendMessage, 
  handleKeyPress, 
  isLoading 
}) => {
  return (
    <footer className="p-4 bg-white border-t shadow-lg">
      <div className="flex space-x-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything to your personal Chat Assistant..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 text-gray-700"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className={`p-3 rounded-full text-white transition duration-150 shadow-lg ${
            isLoading || !inputMessage.trim()
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl'
          }`}
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </footer>
  );
};

export default ChatInput;