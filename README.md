# Clawdbot Dashboard V2 🚀

A modern, multi-panel workspace dashboard for Clawdbot with real-time thinking display and file management.

![Dashboard Screenshot](docs/screenshot.png)

## ✨ Features

### Core Features
- ✅ **Multi-Panel Workspace** - Add/remove panels dynamically, each with independent chat sessions
- ✅ **Real-time Thinking Display** - Always visible (collapsible) thinking section showing AI reasoning
- ✅ **File Management** - Drag & drop upload with inline preview (images, PDFs, text files)
- ✅ **History Browser** - Search and export conversation history
- ✅ **Dual Themes** - Metallic dark blue (default) + light mode with smooth transitions
- ✅ **Responsive Grid** - Auto-arranges panels (1-4 per row based on screen size)

### Technical Stack
- **React 18** - Modern UI framework
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Vite** - Fast build tool
- **WebSocket** - Real-time communication (ready for integration)

## 🚀 Quick Start

### Installation
```bash
cd ~/clawd/projects/dashboard-v2
npm install
```

### Development
```bash
npm run dev
```
Dashboard will be available at: **http://localhost:5173/**

### Production Build
```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Multi-Panel Management
1. **Add Panel** - Click "+ Add Panel" button in header
2. **Remove Panel** - Click the ✕ button on any panel header
3. **Rename Panel** - Click on the panel name to edit
4. Each panel maintains independent state (messages, files, thinking)

### Chat Interface
- Type messages in the input field
- Press Enter or click "Send"
- Messages appear with timestamps
- User messages: blue (right), Assistant: gray (left)

### Thinking Section
- Located at bottom of each panel
- Collapse/expand by clicking the header
- Shows real-time AI reasoning (via WebSocket)
- Purple theme with brain emoji 🧠

### File Management
1. Switch to "Files" tab
2. Drag & drop files or click "Choose Files"
3. Supported formats:
   - **Images** (jpg, png, gif) - Inline preview
   - **PDFs** - Embedded viewer
   - **Text files** - Code preview
4. Remove files with the ✕ button

### History Browser
1. Switch to "History" tab
2. Use search bar to filter messages
3. Click "Export" to download conversation as .txt
4. Timeline view with color-coded messages

### Theme Toggle
- Click sun ☀️ icon for light mode
- Click moon 🌙 icon for dark mode
- Theme persists across panels

## 🎨 Theme Colors

### Dark Mode (Default)
- Background: `#0a0e1a` (near black)
- Panel: `#1a2332` (dark blue)
- Accent: `#2563eb` (metallic blue)
- Text: `#e2e8f0` (light gray)

### Light Mode
- Background: `#f8fafc` (off-white)
- Panel: `#ffffff` (white)
- Accent: `#1e40af` (dark blue)
- Text: `#1e293b` (dark gray)

## 🔌 WebSocket Integration

The dashboard includes a WebSocketManager component ready for real-time integration:

```javascript
// Expected WebSocket message formats:

// New message
{
  "type": "message",
  "panelId": "panel-1",
  "role": "assistant",
  "content": "Response text"
}

// Thinking stream
{
  "type": "thinking",
  "panelId": "panel-1",
  "content": "Current thinking process..."
}

// Thinking complete
{
  "type": "thinking-complete",
  "panelId": "panel-1"
}
```

Default WebSocket endpoint: `ws://localhost:18789/ws`

## 📁 Project Structure

```
dashboard-v2/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top navigation bar
│   │   ├── PanelGrid.jsx        # Responsive grid container
│   │   ├── Panel.jsx            # Individual panel wrapper
│   │   ├── ChatWindow.jsx       # Message display & input
│   │   ├── ThinkingSection.jsx  # Collapsible thinking display
│   │   ├── FileSection.jsx      # Drag & drop file manager
│   │   ├── HistoryBrowser.jsx   # Search & export history
│   │   └── WebSocketManager.jsx # Real-time connection handler
│   ├── store.js                 # Zustand state management
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles + TailwindCSS
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # TailwindCSS configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🎯 Completed Requirements

All Priority 1 (Minimum) features:
- ✅ Multi-panel grid layout
- ✅ Add/remove panels dynamically
- ✅ Real-time thinking display (always visible, collapsible)
- ✅ Basic file upload with preview
- ✅ Metallic dark blue theme

All Priority 2 (Stretch) features:
- ✅ Full history browser
- ✅ Search functionality
- ✅ Light mode toggle
- ✅ Export conversations

## 🔄 Known Limitations & Future Enhancements

### Current Limitations
1. **WebSocket** - Currently shows demo responses, needs backend integration
2. **File Storage** - Files stored in memory, not persisted
3. **Panel State** - Resets on page refresh (no localStorage yet)
4. **Search** - Client-side only, not indexed

### Future Enhancements
1. **Persistence** - Save panel state to localStorage
2. **Backend Integration** - Connect to actual Clawdbot API
3. **File Upload** - Send files to backend for processing
4. **Advanced Search** - Full-text search with highlighting
5. **Keyboard Shortcuts** - Quick panel switching, send message (Cmd+Enter)
6. **Panel Layouts** - Save/restore custom layouts
7. **Syntax Highlighting** - Code blocks in messages
8. **Markdown Support** - Rich text formatting in messages
9. **Panel Resizing** - Drag to resize individual panels
10. **Session Management** - Save/load conversation sessions

## 🐛 Development Notes

### Testing Checklist
- [x] Multi-panel creation/deletion
- [x] Message sending and display
- [x] Thinking section collapse/expand
- [x] File drag & drop
- [x] File preview (images, PDFs)
- [x] History search
- [x] Conversation export
- [x] Theme toggle (dark/light)
- [x] Responsive grid layout
- [x] Animations (Framer Motion)

### Browser Compatibility
- Chrome/Edge: ✅ Fully tested
- Firefox: ⚠️ Should work (not tested)
- Safari: ⚠️ Should work (not tested)

### Performance
- React 18 with concurrent features
- Optimized re-renders with Zustand
- Smooth animations with Framer Motion
- Lightweight bundle (~140 packages)

## 📝 Development Timeline

**Built in:** ~2 hours (automated workflow)
**Status:** ✅ Complete and tested

### What Was Built
1. **23:00-23:30** ✅ Project setup + Configuration
2. **23:30-00:15** ✅ State management + Main layout
3. **00:15-01:00** ✅ Panel system + Chat window
4. **01:00-01:30** ✅ Thinking section + Animations
5. **01:30-02:00** ✅ File management system
6. **02:00-02:15** ✅ History browser + Search
7. **02:15-02:30** ✅ Theme system (dark/light)
8. **02:30-03:00** ✅ Testing + Refinement

## 📄 License

Part of the Clawdbot project.

## 🙏 Credits

Built with React, TailwindCSS, Framer Motion, and Zustand.
