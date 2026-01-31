import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'

function FileSection({ panel }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const { addFile, removeFile } = useStore()

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        addFile(panel.id, {
          name: file.name,
          type: file.type,
          size: file.size,
          data: event.target.result
        })
      }
      
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file)
      } else if (file.type === 'application/pdf') {
        reader.readAsDataURL(file)
      } else {
        reader.readAsText(file)
      }
    })
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        addFile(panel.id, {
          name: file.name,
          type: file.type,
          size: file.size,
          data: event.target.result
        })
      }
      
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file)
      } else if (file.type === 'application/pdf') {
        reader.readAsDataURL(file)
      } else {
        reader.readAsText(file)
      }
    })
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="h-full flex flex-col">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`m-4 border-2 border-dashed rounded-lg transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <div className="p-8 text-center">
          <div className="text-4xl mb-2">📁</div>
          <p className="text-lg font-medium mb-2">Drop files here</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            or click to browse
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence>
          {panel.files.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-600 mt-8">
              No files uploaded yet
            </p>
          ) : (
            panel.files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="mb-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatSize(file.size)} • {new Date(file.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(panel.id, file.id)}
                    className="ml-2 w-6 h-6 rounded hover:bg-red-500/20 text-red-500 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                {/* Preview */}
                {file.type.startsWith('image/') && (
                  <img
                    src={file.data}
                    alt={file.name}
                    className="w-full rounded border border-gray-300 dark:border-gray-600"
                  />
                )}
                {file.type === 'application/pdf' && (
                  <iframe
                    src={file.data}
                    className="w-full h-64 rounded border border-gray-300 dark:border-gray-600"
                    title={file.name}
                  />
                )}
                {!file.type.startsWith('image/') && file.type !== 'application/pdf' && (
                  <pre className="text-xs bg-gray-200 dark:bg-gray-900 p-2 rounded overflow-x-auto max-h-32">
                    {file.data?.substring(0, 500)}
                    {file.data?.length > 500 && '...'}
                  </pre>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FileSection
