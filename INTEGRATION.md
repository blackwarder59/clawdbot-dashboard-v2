# Dashboard V2 - Backend Integration Guide 🔌

This guide explains how to connect Dashboard V2 to the Clawdbot backend.

## 🎯 Overview

Dashboard V2 is currently running in **demo mode** with mock responses. To enable full functionality, you need to:

1. Set up WebSocket connection to Clawdbot gateway
2. Configure API endpoints for file uploads
3. Implement session persistence
4. Handle authentication (if required)

## 🌐 WebSocket Integration

### Current Setup

The `WebSocketManager` component is ready but needs backend configuration:

**File:** `src/components/WebSocketManager.jsx`

```javascript
// Current WebSocket endpoint (update this!)
const ws = new WebSocket('ws://localhost:18789/ws')
```

### Backend Requirements

Your backend should:

1. **Accept WebSocket connections** on `/ws` endpoint
2. **Send messages** in the following formats:

#### Message Types

**1. Assistant Message**
```json
{
  "type": "message",
  "panelId": "panel-1738338659000",
  "role": "assistant",
  "content": "This is the assistant's response."
}
```

**2. Thinking Stream (Real-time)**
```json
{
  "type": "thinking",
  "panelId": "panel-1738338659000",
  "content": "Analyzing the question... considering multiple approaches..."
}
```

**3. Thinking Complete**
```json
{
  "type": "thinking-complete",
  "panelId": "panel-1738338659000"
}
```

**4. User Message (Dashboard → Backend)**
```json
{
  "type": "message",
  "panelId": "panel-1738338659000",
  "role": "user",
  "content": "User's question here"
}
```

### Integration Steps

#### Step 1: Update WebSocket URL

Edit `src/components/WebSocketManager.jsx`:

```javascript
// Change this line:
const ws = new WebSocket('ws://localhost:18789/ws')

// To your actual endpoint:
const ws = new WebSocket('wss://your-backend.com/api/ws')
```

#### Step 2: Send User Messages to Backend

Modify `src/components/ChatWindow.jsx`:

Replace the demo timeout with actual WebSocket send:

```javascript
const handleSend = (e) => {
  e.preventDefault()
  if (inputValue.trim()) {
    const message = {
      role: 'user',
      content: inputValue.trim()
    }
    
    // Add to local state
    addMessage(panel.id, message)
    setInputValue('')
    
    // Send to backend via WebSocket
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        panelId: panel.id,
        ...message
      }))
    }
  }
}
```

**Note:** You'll need to pass `wsRef` from WebSocketManager to ChatWindow via context or props.

#### Step 3: Handle Reconnection

The WebSocketManager already includes automatic reconnection:

```javascript
ws.onclose = () => {
  console.log('WebSocket disconnected')
  // Attempt to reconnect after 5 seconds
  setTimeout(connectWebSocket, 5000)
}
```

You may want to add:
- Visual indicator when disconnected
- User notification
- Retry counter with exponential backoff

## 📤 File Upload Integration

### Current Setup

Files are stored in memory (browser state). To integrate with backend:

#### Step 1: Create Upload Endpoint

Your backend should expose a file upload endpoint:

```
POST /api/files
Content-Type: multipart/form-data

Body:
- panelId: string
- file: File
```

#### Step 2: Update FileSection Component

Edit `src/components/FileSection.jsx`:

Add this function:

```javascript
const uploadFileToBackend = async (panelId, file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('panelId', panelId)
  
  try {
    const response = await fetch('/api/files', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.fileId // Backend returns file ID
    }
  } catch (error) {
    console.error('File upload failed:', error)
  }
}
```

Then call it in `handleDrop` and `handleFileSelect`:

```javascript
reader.onload = async (event) => {
  const fileId = await uploadFileToBackend(panel.id, file)
  
  addFile(panel.id, {
    id: fileId, // Use backend ID instead of Date.now()
    name: file.name,
    type: file.type,
    size: file.size,
    data: event.target.result
  })
}
```

## 💾 Session Persistence

### Option 1: localStorage (Client-side)

Add to `src/store.js`:

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // ... existing state
    }),
    {
      name: 'clawdbot-dashboard-storage',
      // Optionally exclude some fields
      partialize: (state) => ({
        panels: state.panels,
        darkMode: state.darkMode
      })
    }
  )
)
```

**Pros:** Simple, works offline  
**Cons:** Limited storage, client-only

### Option 2: Backend Database (Recommended)

Create endpoints:

```
GET  /api/sessions          # List all sessions
GET  /api/sessions/:id      # Get session data
POST /api/sessions          # Create new session
PUT  /api/sessions/:id      # Update session
DELETE /api/sessions/:id    # Delete session
```

Session data structure:

```json
{
  "id": "panel-1738338659000",
  "name": "Session 1",
  "messages": [...],
  "files": [...],
  "createdAt": "2026-01-31T11:30:00Z",
  "updatedAt": "2026-01-31T12:45:00Z"
}
```

## 🔐 Authentication

If your backend requires authentication:

### Step 1: Add Auth State

```javascript
// src/store.js
export const useStore = create((set) => ({
  // ... existing state
  token: null,
  setToken: (token) => set({ token }),
  logout: () => set({ token: null, panels: [] })
}))
```

### Step 2: Include Token in Requests

```javascript
// WebSocket
const ws = new WebSocket(`ws://localhost:18789/ws?token=${token}`)

// File uploads
const response = await fetch('/api/files', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
```

### Step 3: Add Login Component

Create `src/components/Login.jsx`:

```javascript
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (response.ok) {
      const { token } = await response.json()
      onLogin(token)
    }
  }
  
  // ... render login form
}
```

## 🛣️ Routing (Optional)

To integrate with existing gateway routes:

### Option 1: Reverse Proxy (Nginx)

```nginx
location /v2 {
  proxy_pass http://localhost:5173;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
}
```

### Option 2: Express Static Serve

After building:

```javascript
// In your gateway server
app.use('/v2', express.static('path/to/dashboard-v2/dist'))
```

### Option 3: Update Vite Base Path

Edit `vite.config.js`:

```javascript
export default defineConfig({
  base: '/v2/',
  // ... rest of config
})
```

Then rebuild and serve from `/v2/` path.

## 🧪 Testing Backend Integration

### Manual Testing Checklist

- [ ] WebSocket connects successfully
- [ ] Can send messages to backend
- [ ] Receive assistant responses
- [ ] Thinking streams display in real-time
- [ ] Files upload to backend
- [ ] Can retrieve uploaded files
- [ ] Sessions persist across page reload
- [ ] Authentication works (if implemented)
- [ ] Reconnection works after disconnect

### Debug Mode

Add to `src/components/WebSocketManager.jsx`:

```javascript
ws.onmessage = (event) => {
  console.log('[WS] Received:', event.data) // Add this
  
  try {
    const data = JSON.parse(event.data)
    // ... handle message
  } catch (error) {
    console.error('[WS] Parse error:', error)
  }
}
```

## 📝 Environment Variables

Create `.env` file:

```bash
VITE_WS_URL=ws://localhost:18789/ws
VITE_API_URL=http://localhost:18789/api
```

Use in code:

```javascript
const wsUrl = import.meta.env.VITE_WS_URL
const apiUrl = import.meta.env.VITE_API_URL
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update WebSocket URL to production endpoint
- [ ] Update API URLs
- [ ] Enable HTTPS/WSS
- [ ] Add error boundaries
- [ ] Implement proper error handling
- [ ] Add loading states
- [ ] Configure CORS on backend
- [ ] Add rate limiting
- [ ] Implement authentication
- [ ] Set up monitoring/logging
- [ ] Test with multiple concurrent users
- [ ] Optimize bundle size
- [ ] Add service worker (PWA optional)

## 🔧 Troubleshooting

### WebSocket won't connect
- Check CORS settings on backend
- Verify WebSocket endpoint is correct
- Check browser console for errors
- Test with `wscat` or similar tool

### Files won't upload
- Check file size limits (frontend + backend)
- Verify `Content-Type` header
- Check backend accepts multipart/form-data
- Inspect network tab in DevTools

### Messages not appearing
- Check WebSocket connection status
- Verify message format matches spec
- Check `panelId` is correct
- Look for JavaScript errors in console

## 📚 Additional Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Framer Motion](https://www.framer.com/motion/)
- [TailwindCSS](https://tailwindcss.com/)

---

**Need help?** Check the console logs and browser DevTools Network tab for clues!
