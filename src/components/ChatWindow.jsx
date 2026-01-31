import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store'

function ChatWindow({ panel }) {
  const messagesEndRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const addMessage = useStore((state) => state.addMessage)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [panel.messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addMessage(panel.id, {
        role: 'user',
        content: inputValue.trim()
      })
      setInputValue('')
      
      // Simulate AI response after a delay
      setTimeout(() => {
        addMessage(panel.id, {
          role: 'assistant',
          content: 'This is a demo response. Connect to WebSocket for real responses.'
        })
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {panel.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <div className="text-center">
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm mt-2">Start a conversation below</p>
            </div>
          </div>
        ) : (
          panel.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <p className="text-sm font-medium mb-1 opacity-70">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </p>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatWindow
