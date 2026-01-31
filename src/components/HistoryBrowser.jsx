import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store'

function HistoryBrowser({ panel }) {
  const [searchQuery, setSearchQuery] = useState('')
  const searchHistory = useStore((state) => state.searchHistory)

  const filteredMessages = searchQuery
    ? searchHistory(panel.id, searchQuery)
    : panel.messages

  const exportConversation = () => {
    const content = panel.messages
      .map((msg) => `[${new Date(msg.timestamp).toLocaleString()}] ${msg.role}: ${msg.content}`)
      .join('\n\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${panel.name.replace(/\s/g, '_')}_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={exportConversation}
            disabled={panel.messages.length === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            title="Export conversation"
          >
            Export
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <div className="text-center">
              <p className="text-lg font-medium">
                {searchQuery ? 'No messages found' : 'No history yet'}
              </p>
              <p className="text-sm mt-2">
                {searchQuery ? 'Try a different search term' : 'Messages will appear here as you chat'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm">
                  {searchQuery
                    ? highlightText(message.content, searchQuery)
                    : message.content}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function highlightText(text, query) {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-300 dark:bg-yellow-600">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default HistoryBrowser
