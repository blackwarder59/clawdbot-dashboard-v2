import { useEffect, useRef } from 'react'
import { useStore } from '../store'

function WebSocketManager() {
  const wsRef = useRef(null)
  const { addMessage, setThinking, panels } = useStore()

  useEffect(() => {
    // WebSocket connection - adjust URL as needed
    const connectWebSocket = () => {
      try {
        // This is a placeholder - adjust to your actual WebSocket endpoint
        const ws = new WebSocket('ws://localhost:18789/ws')
        wsRef.current = ws

        ws.onopen = () => {
          console.log('WebSocket connected')
        }

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)

            // Handle different message types
            if (data.type === 'message') {
              addMessage(data.panelId || panels[0]?.id, {
                role: data.role,
                content: data.content
              })
            } else if (data.type === 'thinking') {
              setThinking(data.panelId || panels[0]?.id, data.content)
            } else if (data.type === 'thinking-complete') {
              setThinking(data.panelId || panels[0]?.id, null)
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error)
          }
        }

        ws.onerror = (error) => {
          console.error('WebSocket error:', error)
        }

        ws.onclose = () => {
          console.log('WebSocket disconnected')
          // Attempt to reconnect after 5 seconds
          setTimeout(connectWebSocket, 5000)
        }
      } catch (error) {
        console.error('Failed to connect WebSocket:', error)
      }
    }

    connectWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}

export default WebSocketManager
