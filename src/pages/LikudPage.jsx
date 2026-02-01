import { useState, useEffect } from 'react'
import LikudTable from '../components/LikudTable'

const SHEET_ID = '1oINu6aCW38HJ4hI5ZiKf8C83zuBWf4I6GRGs6z9yfNc'
const RANGE = 'Sheet1!A1:K202'

function LikudPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'with-data', 'without-data'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Public Google Sheets API (read-only, no API key needed if sheet is public)
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&range=${RANGE}`
      
      const response = await fetch(url)
      const text = await response.text()
      
      // Google returns JSONP, need to extract JSON
      const json = JSON.parse(text.substring(47, text.length - 2))
      
      // Convert to array format
      const rows = json.table.rows.map(row => 
        row.c.map(cell => cell ? cell.v : '')
      )
      
      setData(rows)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  const filteredData = () => {
    if (!data.length) return []
    
    const [headers, ...rows] = data
    
    if (filter === 'all') return rows
    if (filter === 'with-data') return rows.filter(row => row[6] === 'יש נתונים')
    if (filter === 'without-data') return rows.filter(row => row[6] === 'אין נתונים')
    
    return rows
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">טוען נתונים...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          <h2 className="text-2xl font-bold mb-4">שגיאה</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">ודא שה-Sheet הוא ציבורי (read-only)</p>
        </div>
      </div>
    )
  }

  const headers = data[0] || []
  const rows = filteredData()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            תוצאות מועצות סניפים - ליכוד 2026
          </h1>
          
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              הכל ({data.length - 1})
            </button>
            <button
              onClick={() => setFilter('with-data')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'with-data'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              עם תוצאות ({data.filter(r => r[6] === 'יש נתונים').length})
            </button>
            <button
              onClick={() => setFilter('without-data')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'without-data'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              ללא תוצאות ({data.filter(r => r[6] === 'אין נתונים').length})
            </button>
          </div>

          <div className="flex gap-4">
            <a
              href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              📊 פתח ב-Google Sheets
            </a>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              🔄 רענן
            </button>
          </div>
        </div>

        <LikudTable headers={headers} rows={rows} />
      </div>
    </div>
  )
}

export default LikudPage
