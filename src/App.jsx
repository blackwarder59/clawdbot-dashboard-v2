import { useEffect } from 'react'
import { useStore } from './store'
import Header from './components/Header'
import PanelGrid from './components/PanelGrid'
import WebSocketManager from './components/WebSocketManager'

function App() {
  const darkMode = useStore((state) => state.darkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="h-screen w-screen overflow-hidden bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <WebSocketManager />
      <Header />
      <PanelGrid />
    </div>
  )
}

export default App
