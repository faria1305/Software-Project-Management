import React from 'react';
import { Trash2, MessageSquare, Plus, X } from 'lucide-react';

const Sidebar = ({ 
  chatSessions, 
  currentSessionId, 
  isSidebarOpen, 
  onCreateNewChat, 
  onSwitchChat, 
  onDeleteChat, 
  onCloseSidebar 
}) => {
  return (
    <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 w-64 h-full bg-white border-r shadow-lg transition-transform duration-300`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-700">Chats</h2>
            <button
              onClick={onCloseSidebar}
              className="md:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onCreateNewChat}
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2">
          {chatSessions.map(session => (
            <div
              key={session.id}
              onClick={() => onSwitchChat(session.id)}
              className={`group flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition ${
                session.id === currentSessionId
                  ? 'bg-indigo-100 border-l-4 border-indigo-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center flex-1 min-w-0">
                <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                <span className="text-sm truncate">{session.title}</span>
              </div>
              <button
                onClick={(e) => onDeleteChat(session.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition"
                title="Delete chat"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;