import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // Theme
  darkMode: true,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Panels
  panels: [{ id: 'panel-1', name: 'Session 1', messages: [], files: [], thinking: null }],
  
  addPanel: () => set((state) => {
    const newId = `panel-${Date.now()}`
    return {
      panels: [
        ...state.panels,
        { id: newId, name: `Session ${state.panels.length + 1}`, messages: [], files: [], thinking: null }
      ]
    }
  }),
  
  removePanel: (id) => set((state) => ({
    panels: state.panels.filter(panel => panel.id !== id)
  })),
  
  updatePanel: (id, updates) => set((state) => ({
    panels: state.panels.map(panel => 
      panel.id === id ? { ...panel, ...updates } : panel
    )
  })),
  
  // Messages
  addMessage: (panelId, message) => set((state) => ({
    panels: state.panels.map(panel =>
      panel.id === panelId
        ? { ...panel, messages: [...panel.messages, { ...message, id: Date.now(), timestamp: new Date() }] }
        : panel
    )
  })),
  
  // Thinking
  setThinking: (panelId, thinking) => set((state) => ({
    panels: state.panels.map(panel =>
      panel.id === panelId ? { ...panel, thinking } : panel
    )
  })),
  
  // Files
  addFile: (panelId, file) => set((state) => ({
    panels: state.panels.map(panel =>
      panel.id === panelId
        ? { ...panel, files: [...panel.files, { ...file, id: Date.now(), timestamp: new Date() }] }
        : panel
    )
  })),
  
  removeFile: (panelId, fileId) => set((state) => ({
    panels: state.panels.map(panel =>
      panel.id === panelId
        ? { ...panel, files: panel.files.filter(f => f.id !== fileId) }
        : panel
    )
  })),
  
  // History
  searchHistory: (panelId, query) => {
    const panel = get().panels.find(p => p.id === panelId)
    if (!panel) return []
    
    return panel.messages.filter(msg =>
      msg.content?.toLowerCase().includes(query.toLowerCase()) ||
      msg.role?.toLowerCase().includes(query.toLowerCase())
    )
  },
  
  // Settings
  showHistory: false,
  toggleHistory: () => set((state) => ({ showHistory: !state.showHistory })),
  
  thinkingCollapsed: {},
  toggleThinkingCollapsed: (panelId) => set((state) => ({
    thinkingCollapsed: {
      ...state.thinkingCollapsed,
      [panelId]: !state.thinkingCollapsed[panelId]
    }
  })),
}))
