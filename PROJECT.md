# Clawdbot Dashboard V2 - Project Spec

## 🎯 Goal
Build a modern, multi-panel workspace dashboard for Clawdbot with real-time thinking display and file management.

## 📋 Requirements (User Approved)

### Core Features
1. **Multi-Panel Workspace**
   - Grid layout - panels side by side
   - Add/remove panels dynamically
   - Each panel = full session view
   - Responsive (1-4 panels per row)
   - Auto-arrange on resize

2. **Thinking Display**
   - Always visible by default (collapsible)
   - Real-time streaming during generation
   - Syntax highlighting
   - Per panel (each session shows its own thinking)

3. **File Management**
   - Drag & drop upload
   - Image preview inline
   - PDF embedded viewer
   - File history per session
   - Quick upload button

4. **History Browser**
   - Timeline view of all messages
   - Search functionality
   - Jump to message
   - Export conversations

5. **Theme**
   - **Primary:** Metallic Dark Blue
   - **Both:** Dark + Light modes
   - Toggle button
   - Smooth transitions

### Color Palette

**Dark Mode:**
- Background: `#0a0e1a` (near black)
- Panel: `#1a2332` (dark blue)
- Accent: `#2563eb` (metallic blue)
- Text: `#e2e8f0` (light gray)
- Metallic effect: gradient overlays

**Light Mode:**
- Background: `#f8fafc`
- Panel: `#ffffff`
- Accent: `#1e40af` (dark blue)
- Text: `#1e293b`
- Metallic effect: subtle blues

## 🔧 Technical Stack

- **Frontend:** React 18
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Layout:** CSS Grid
- **State:** Zustand
- **Real-time:** WebSocket
- **Files:** HTML5 Drag & Drop API
- **Build:** Vite
- **Theme:** CSS Variables

## 📐 Layout Structure

```
App
├── Header
│   ├── Logo
│   ├── Add Panel Button
│   ├── Settings
│   └── Theme Toggle
├── PanelGrid (CSS Grid)
│   └── Panel[] (dynamic)
│       ├── Header (session name, close)
│       ├── ChatWindow
│       │   ├── Messages[]
│       │   └── ThinkingSection
│       ├── FileSection
│       │   ├── DropZone
│       │   └── FileList
│       └── HistoryBrowser
└── WebSocketManager
```

## ⏱️ Timeline

**Night Shift (23:00-07:00):**
1. **23:00-00:30** - Project setup + Grid layout + Panel system
2. **00:30-02:00** - Chat component + Thinking display + WebSocket
3. **02:00-03:30** - File upload/display system
4. **03:30-05:00** - History browser + Search
5. **05:00-06:30** - Metallic theme + Dark/Light toggle
6. **06:30-07:00** - Testing + Polish

## 🎯 Deliverables

**Minimum (Priority 1):**
- ✅ Multi-panel grid
- ✅ Add/remove panels
- ✅ Real-time thinking display
- ✅ Basic file upload/preview
- ✅ Metallic dark blue theme

**Stretch (Priority 2):**
- ✅ Full history browser
- ✅ Search functionality
- ✅ Light mode
- ✅ Export conversations

## 📊 Rate Limits Check
- 5h window: 97% left (2h 12m)
- Week: 100% left (6d 22h)
- **Status:** ✅ Safe to proceed

## 🚀 Deployment
- URL: `http://localhost:18789/v2`
- Integration: New route in existing gateway
- Fallback: Old dashboard at `/` remains

## 📝 Notes
- User works with Cursor/similar editors
- Values visualization over CLI
- Wants to see sub-agent thinking in parallel
- Files and history are critical features

---

**Start Time:** 2026-01-29 23:00
**Expected Completion:** 2026-01-30 07:00
**Status:** Ready to build
