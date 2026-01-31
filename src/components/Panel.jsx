import { useState } from 'react'
import { useStore } from '../store'
import { motion } from 'framer-motion'
import ChatWindow from './ChatWindow'
import ThinkingSection from './ThinkingSection'
import FileSection from './FileSection'
import HistoryBrowser from './HistoryBrowser'

function Panel({ panel }) {
  const { removePanel, updatePanel, showHistory } = useStore()
  const [activeTab, setActiveTab] = useState('chat')

  const handleRemove = () => {
    if (useStore.getState().panels.length > 1) {
      removePanel(panel.id)
    }
  }

  const handleNameChange = (e) => {
    updatePanel(panel.id, { name: e.target.value })
  }

  return (
    <motion.div
      className="h-[calc(100vh-6rem)] bg-light-panel dark:bg-dark-panel rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col metallic-gradient"
      whileHover={{ boxShadow: '0 20px 60px rgba(37, 99, 235, 0.3)' }}
    >
      {/* Panel Header */}
      <div className="h-14 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 bg-white/50 dark:bg-black/20">
        <input
          type="text"
          value={panel.name}
          onChange={handleNameChange}
          className="bg-transparent border-none outline-none font-semibold text-lg flex-1 mr-2"
        />
        <button
          onClick={handleRemove}
          className="w-8 h-8 rounded-lg hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-colors"
          title="Close Panel"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-black/10">
        {['chat', 'files', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'chat' && (
          <>
            <div className="flex-1 overflow-auto">
              <ChatWindow panel={panel} />
            </div>
            <ThinkingSection panel={panel} />
          </>
        )}
        {activeTab === 'files' && <FileSection panel={panel} />}
        {activeTab === 'history' && <HistoryBrowser panel={panel} />}
      </div>
    </motion.div>
  )
}

export default Panel
