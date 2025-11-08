# 🧠 LLM Chat Assistant: A Full Stack Gemini Powered Chatbot

## 📖 Overview
**LLM Chat Assistant** is a full-stack chatbot web application that lets users chat with **Google’s Gemini 2.5 Flash model** in real time.  
It works like a modern AI chat system where users can start new conversations, switch between chats, and receive instant AI-generated replies.

---

## 🚀 Key Features
- **💬 Multi-Session Chat:**  
  Manage multiple, independent chat sessions simultaneously. Users can create, switch, or delete chats — each with its own saved history and context.

- **⚡ Real-Time AI Replies:**  
  Sends messages to the backend and displays Gemini’s AI responses instantly.

- **🧭 Session Handling:**  
  Each chat has a unique session ID to keep conversations organized.

- **🧱 Responsive Design:**  
  Built with React and TailwindCSS for a clean, modern, and mobile-friendly interface.

- **🧰 Error Handling:**  
  If something goes wrong, the system shows clear and user-friendly alerts.

- **🔐 Secure API:**  
  The Gemini API key is safely stored using environment variables.

---

## 🛠️ Technology Stack
| Layer | Technologies |
|-------|---------------|
| **Frontend** | React (with Hooks), TailwindCSS |
| **Backend** | Node.js, Express, CORS, dotenv |
| **AI Engine** | Google Gemini 2.5 Flash (`@google/genai`) |
| **Environment** | Localhost (Frontend: 5173, Backend: 3001) |

---

## 🧩 Technical Details

### **Frontend (React + TailwindCSS)**
- **Sidebar:** Lists all chat sessions with controls for creating and deleting chats.  
- **Main Chat Area:** Displays dialogue bubbles, typing indicators, and input controls.  
- Communicates with backend via `fetch()` requests.

### **Backend (Node.js + Express)**
- **POST /chat:** Sends messages to the Gemini model and returns AI responses with full chat history.  
- **POST /reset:** Deletes a chat session and clears its memory.  
- Uses **CORS** for cross-origin requests and maintains session data in memory.  

---

## 🧰 Prerequisites
Make sure you have the following installed:
- [Node.js (v18 or later)](https://nodejs.org/)
- [npm](Comes with Node.js)
- [Google Gemini API Key](https://ai.google.dev/) (required for AI responses)




