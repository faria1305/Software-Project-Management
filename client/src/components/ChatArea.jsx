import React from 'react';
import { MessageSquare, Menu, Loader2 } from 'lucide-react';

const ChatArea = ({ 
  currentSession, 
  messages, 
  isLoading, 
  onMenuClick, 
  messagesEndRef 
}) => {
  // Function to render each chat bubble
  const renderMessage = (msg, index) => {
    const isUser = msg.role === 'user';
    const isSystemError = msg.role === 'system-error';
    const isSystemSuccess = msg.role === 'system-success';

    let bubbleClasses = '';
    let textClasses = '';

    if (isUser) {
      bubbleClasses = 'bg-indigo-500 text-white self-end rounded-br-none';
      textClasses = '';
    } else if (isSystemError) {
      bubbleClasses = 'bg-red-100 text-red-700 self-center border border-red-300 rounded-lg text-sm py-2 px-4 my-2';
      textClasses = 'font-semibold';
      return (
        <div key={index} className="flex justify-center w-full">
          <div className={bubbleClasses}>
            <p className={textClasses}>{msg.text}</p>
          </div>
        </div>
      );
    } else if (isSystemSuccess) {
      bubbleClasses = 'bg-green-100 text-green-700 self-center border border-green-300 rounded-lg text-sm py-2 px-4 my-2';
      textClasses = 'font-semibold';
      return (
        <div key={index} className="flex justify-center w-full">
          <div className={bubbleClasses}>
            <p className={textClasses}>{msg.text}</p>
          </div>
        </div>
      );
    } else {
      bubbleClasses = 'bg-gray-100 text-gray-800 self-start rounded-tl-none';
      textClasses = '';
    }

    return (
      <div 
        key={index} 
        className={`max-w-[85%] sm:max-w-[70%] md:max-w-[60%] p-3 my-2 shadow-md rounded-xl ${bubbleClasses}`}
      >
        <p className={textClasses} style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden mr-3 p-2 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="flex items-center text-xl font-bold text-indigo-600">
            <MessageSquare className="w-6 h-6 mr-2" />
            {currentSession?.title || 'Chat Assistant'}
          </h1>
        </div>
      </header>

      {/* Chat Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
              <MessageSquare className="w-8 h-8 mx-auto mb-3 text-indigo-400" />
              <p className="text-lg font-semibold">Hello! I'm your Personal Chat Assistant.</p>
              <p className="text-sm">Ask me Anything.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="self-start p-3 my-2 rounded-xl bg-gray-100 text-gray-600 shadow-md flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span className="text-sm">Your Chat Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatArea;