import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useStore } from './store'
import Header from './components/Header'
import PanelGrid from './components/PanelGrid'
import WebSocketManager from './components/WebSocketManager'
import LikudPage from './pages/LikudPage'

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
    <Router>
      <div className="h-screen w-screen overflow-hidden bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
        <WebSocketManager />
        
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <PanelGrid />
            </>
          } />
          
          <Route path="/likud" element={<LikudPage />} />
        </Routes>
        
        {/* Navigation Menu */}
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            to="/likud"
            className="block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors mb-2"
          >
            📊 תוצאות ליכוד
          </Link>
          <Link
            to="/"
            className="block px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
          >
            🏠 דשבורד ראשי
          </Link>
        </div>
      </div>
    </Router>
  )
}

export default App
