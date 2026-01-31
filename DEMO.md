# Dashboard V2 - Demo Guide 🎬

This guide walks you through all the features of the new Dashboard V2.

## 🌐 Access the Dashboard

**Development URL:** http://localhost:5173/

**Note:** The original Clawdbot gateway runs on port 18789, so we use 5173 for Dashboard V2 to avoid conflicts.

## 📋 Demo Walkthrough

### 1. First Impression
When you first load the dashboard, you'll see:
- **Header** with Clawdbot logo and controls
- **One panel** (Session 1) with three tabs: Chat, Files, History
- **Dark mode** active by default (metallic dark blue theme)
- **Thinking section** at the bottom (collapsed or showing "No active thinking process")

### 2. Send Your First Message
1. Type a message in the input field: "Hello Dashboard V2!"
2. Click "Send" or press Enter
3. **Watch:**
   - Your message appears in a blue bubble (right side)
   - After 1 second, a demo response appears in gray (left side)
   - Both messages show timestamps

### 3. Add More Panels
1. Click **"+ Add Panel"** in the header
2. A new panel (Session 2) appears side by side
3. Each panel is completely independent:
   - Own chat history
   - Own file uploads
   - Own thinking display
4. Try adding a 3rd panel to see the responsive grid

### 4. Rename a Panel
1. Click on the panel name ("Session 1")
2. Type a new name (e.g., "Main Chat")
3. Click outside to save

### 5. Test the Thinking Section
1. Look at the bottom of any panel with messages
2. You'll see: **🧠 Thinking ▲**
3. Click it to collapse
4. Icon changes to **🧠 Thinking ▼**
5. Click again to expand

**Note:** In production, this section will show real-time AI reasoning as the model "thinks" through responses.

### 6. Upload and Preview Files

#### Upload an Image
1. Switch to the **"Files"** tab
2. **Drag & drop** an image file into the dashed zone
   - OR click "Choose Files" to browse
3. **Watch:**
   - File appears with preview
   - Name, size, and timestamp displayed
   - Click ✕ to remove

#### Try Different File Types
- **Images** (jpg, png, gif) → Inline preview
- **PDFs** → Embedded viewer
- **Text files** → Code preview (first 500 chars)

### 7. Search History
1. Switch to the **"History"** tab
2. You'll see all messages in a timeline view
3. Type in the search box: "Hello"
4. Messages are filtered in real-time
5. Matching text is highlighted in yellow

### 8. Export Conversation
1. In the History tab, click **"Export"**
2. A .txt file downloads with format:
   ```
   [31.1.2026, 11:30:59] user: Hello Dashboard V2!
   [31.1.2026, 11:31:00] assistant: This is a demo response...
   ```

### 9. Toggle Theme
1. Click the **☀️** (sun) icon in the header
2. **Watch:**
   - Background changes to light gray/white
   - Panels turn white
   - Text becomes dark
   - Icon changes to 🌙 (moon)
3. Click again to return to dark mode
4. Smooth transition animation

### 10. Remove a Panel
1. Click the **✕** button on any panel header
2. Panel animates out and disappears
3. **Note:** You can't remove the last panel

## 🎨 Visual Features to Notice

### Animations (Framer Motion)
- Panel creation/deletion: Scale + fade
- Message appearance: Slide up + fade
- Thinking collapse: Height animation
- Button hover effects: Scale
- Panel hover: Glow shadow

### Responsive Grid
Try resizing your browser window:
- **Small screens:** 1 panel per row
- **Medium screens:** 2 panels per row
- **Large screens:** 3 panels per row
- **Extra large:** 4 panels per row

### Theme Effects
**Dark Mode:**
- Metallic gradient overlay on panels
- Subtle blue glow on hover
- Dark blue accents

**Light Mode:**
- Clean white panels
- Soft shadows
- Blue accents maintained

## 🔍 Hidden Details

### Scrollbars
- Custom styled scrollbars (dark/light aware)
- Hover to see them more clearly

### Input Focus
- Blue ring appears when focused
- Smooth transition

### Button States
- Hover: Slight scale up
- Click: Scale down
- Active tabs: Blue background

### File Drop Zone
- Changes color when dragging files over it
- Dashed border becomes solid blue

## 🧪 Testing Scenarios

### Scenario 1: Multi-Session Workflow
1. Add 3 panels
2. Rename them: "Frontend", "Backend", "Testing"
3. Send different messages to each
4. Switch between tabs in each panel
5. Upload files to different panels
6. Search history in each

### Scenario 2: File Management
1. Upload 5 different files (mix of images, PDFs, text)
2. Preview each type
3. Remove some files
4. Switch panels to see files are independent

### Scenario 3: Theme Testing
1. Toggle to light mode
2. Add a new panel
3. Send messages
4. Upload a file
5. Search history
6. Toggle back to dark mode
7. Verify everything still works

## 🚀 What to Expect in Production

When connected to the real Clawdbot backend:

1. **Real Responses** - Actual AI-generated responses (not demo text)
2. **Live Thinking** - Real-time streaming of AI reasoning
3. **File Processing** - Files sent to backend for analysis
4. **Persistent Sessions** - Panels survive page refresh
5. **WebSocket Events** - Real-time updates from backend

## 🎯 Demo Checklist

Use this to verify all features work:

- [ ] Dashboard loads successfully
- [ ] Send message works
- [ ] Messages appear with timestamps
- [ ] Add panel creates new panel
- [ ] Rename panel works
- [ ] Remove panel works (not last one)
- [ ] Files tab shows drag & drop zone
- [ ] File upload works (drag or click)
- [ ] Image preview works
- [ ] PDF preview works
- [ ] File removal works
- [ ] History tab shows timeline
- [ ] Search filters messages
- [ ] Export downloads .txt file
- [ ] Theme toggle switches modes
- [ ] Thinking section collapses/expands
- [ ] Responsive grid adjusts to window size
- [ ] Animations are smooth
- [ ] No console errors

## 💡 Tips for Demo Presentation

1. **Start in Dark Mode** - Shows off the metallic theme
2. **Add Panels Gradually** - Don't rush, show each feature
3. **Upload a Photo** - Visual impact is strong
4. **Search History** - Highlight the yellow highlighting
5. **Toggle Theme Last** - Big "wow" moment
6. **Keep 2-3 Panels Open** - Shows multi-session capability

## 🎬 30-Second Pitch

"This is Dashboard V2 - a multi-panel workspace where you can run multiple AI conversations side by side. Each panel has its own chat, file uploads, and history. You can drag & drop files for instant preview, search your entire conversation history, and toggle between dark and light themes. The thinking section at the bottom shows you how the AI reasons through responses in real-time. It's built with React, TailwindCSS, and Framer Motion for smooth 60fps animations."

---

**Enjoy the demo! 🚀**
