export const API_BASE_URL = 'http://localhost:3001';

// Function to generate a simple UUID for the session ID
export const generateSessionId = () => {
  return 'session-' + Date.now() + '-' + Math.random().toString(16).substring(2, 8);
};

// Generate title from first message
export const generateTitle = (firstMessage) => {
  if (!firstMessage) return 'New Chat';
  return firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
};