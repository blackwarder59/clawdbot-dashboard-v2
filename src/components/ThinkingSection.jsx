import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'

function ThinkingSection({ panel }) {
  const { thinkingCollapsed, toggleThinkingCollapsed } = useStore()
  const isCollapsed = thinkingCollapsed[panel.id] || false

  if (!panel.thinking && panel.messages.length === 0) {
    return null
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-purple-50 dark:bg-purple-900/20">
      {/* Header */}
      <button
        onClick={() => toggleThinkingCollapsed(panel.id)}
        className="w-full px-4 py-2 flex items-center justify-between hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-purple-600 dark:text-purple-400">🧠</span>
          <span className="font-medium text-purple-800 dark:text-purple-300">
            Thinking {panel.thinking && <span className="animate-pulse">●</span>}
          </span>
        </div>
        <span className="text-purple-600 dark:text-purple-400">
          {isCollapsed ? '▼' : '▲'}
        </span>
      </button>

      {/* Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 max-h-48 overflow-y-auto">
              {panel.thinking ? (
                <pre className="text-sm font-mono whitespace-pre-wrap text-purple-900 dark:text-purple-200">
                  {panel.thinking}
                </pre>
              ) : (
                <p className="text-sm text-purple-600 dark:text-purple-400 italic">
                  No active thinking process
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThinkingSection
