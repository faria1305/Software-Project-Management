import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import { API_BASE_URL, generateSessionId, generateTitle } from './utils/helpers';

const App = () => {
  // State for all chat sessions (stored in memory)
  const [chatSessions, setChatSessions] = useState(() => {
    const initialSession = generateSessionId();
    return [{
      id: initialSession,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now()
    }];
  });

  // Current active session
  const [currentSessionId, setCurrentSessionId] = useState(chatSessions[0].id);
  
  // State for the user's current input
  const [inputMessage, setInputMessage] = useState('');
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  
  // Sidebar toggle for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Ref to automatically scroll to the bottom of the chat
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get current session
  const currentSession = chatSessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create new chat
  const handleCreateNewChat = () => {
    const newSessionId = generateSessionId();
    const newSession = {
      id: newSessionId,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now()
    };
    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    setIsSidebarOpen(false);
  };

  // Switch to different chat
  const handleSwitchChat = (sessionId) => {
    setCurrentSessionId(sessionId);
    setIsSidebarOpen(false);
  };

  // Delete a specific chat
  const handleDeleteChat = async (sessionId, e) => {
    e.stopPropagation();
    
    if (chatSessions.length === 1) {
      alert("You can't delete the last chat. Create a new one first.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this chat?")) {
      return;
    }

    try {
      // Call backend to reset this session
      await fetch(`${API_BASE_URL}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      // Remove from local state
      setChatSessions(prev => prev.filter(s => s.id !== sessionId));
      
      // If deleting current chat, switch to another
      if (sessionId === currentSessionId) {
        const remaining = chatSessions.filter(s => s.id !== sessionId);
        setCurrentSessionId(remaining[0].id);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      alert('Failed to delete chat. Please try again.');
    }
  };

  // Function to handle sending the message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Update local state optimistically
    setChatSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        const newMessages = [...session.messages, { role: 'user', text: userMessage }];
        return {
          ...session,
          messages: newMessages,
          title: session.messages.length === 0 ? generateTitle(userMessage) : session.title
        };
      }
      return session;
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: currentSessionId, message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update with full history from backend
      setChatSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: data.fullHistory
          };
        }
        return session;
      }));

    } catch (error) {
      console.error('Error sending message:', error);
      setChatSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, { 
              role: 'system-error', 
              text: 'Error: Could not connect to the server. Ensure backend is running on port 3001.' 
            }]
          };
        }
        return session;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen antialiased bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar
        chatSessions={chatSessions}
        currentSessionId={currentSessionId}
        isSidebarOpen={isSidebarOpen}
        onCreateNewChat={handleCreateNewChat}
        onSwitchChat={handleSwitchChat}
        onDeleteChat={handleDeleteChat}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
        />
      )}

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        <ChatArea
          currentSession={currentSession}
          messages={messages}
          isLoading={isLoading}
          onMenuClick={() => setIsSidebarOpen(true)}
          messagesEndRef={messagesEndRef}
        />

        {/* Input Area */}
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default App;

