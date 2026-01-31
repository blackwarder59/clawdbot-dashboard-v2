import { useStore } from '../store'
import { motion } from 'framer-motion'

function Header() {
  const { darkMode, toggleTheme, addPanel, showHistory, toggleHistory } = useStore()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 bg-light-panel dark:bg-dark-panel border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Clawdbot Dashboard V2
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Add Panel Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addPanel}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md transition-colors"
        >
          + Add Panel
        </motion.button>

        {/* History Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleHistory}
          className={`px-4 py-2 rounded-lg font-medium shadow-md transition-colors ${
            showHistory
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          History
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl shadow-md transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </motion.button>
      </div>
    </motion.header>
  )
}

export default Header
