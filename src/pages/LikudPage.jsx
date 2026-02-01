import { useState, useEffect } from 'react'
import './LikudPage.css'

const SHEET_ID = '1oINu6aCW38HJ4hI5ZiKf8C83zuBWf4I6GRGs6z9yfNc'
const RANGE = 'Sheet1!A1:K202'

function LikudPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&range=${RANGE}`
      const response = await fetch(url)
      const text = await response.text()
      const json = JSON.parse(text.substring(47, text.length - 2))
      const rows = json.table.rows.map(row => 
        row.c.map(cell => cell ? cell.v : '')
      )
      
      setData(rows)
      setLoading(false)
    } catch (err) {
      console.error('Error:', err)
      setError('שגיאה בטעינת הנתונים. ודא שהקובץ ציבורי.')
      setLoading(false)
    }
  }

  const filteredData = () => {
    if (!data.length) return []
    
    const [headers, ...rows] = data
    let filtered = rows

    if (filter === 'with-data') {
      filtered = filtered.filter(row => row[6] === 'יש נתונים')
    } else if (filter === 'without-data') {
      filtered = filtered.filter(row => row[6] === 'אין נתונים')
    }

    if (searchTerm) {
      filtered = filtered.filter(row =>
        row.some(cell => 
          String(cell).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    return filtered
  }

  if (loading) {
    return (
      <div className="likud-loading">
        <div className="likud-spinner"></div>
        <p>טוען נתונים...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="likud-error">
        <h2>❌ שגיאה</h2>
        <p>{error}</p>
        <button onClick={fetchData}>נסה שוב</button>
      </div>
    )
  }

  const headers = data[0] || []
  const rows = filteredData()
  const withData = data.filter(r => r[6] === 'יש נתונים').length
  const withoutData = data.filter(r => r[6] === 'אין נתונים').length

  return (
    <div className="likud-page" dir="rtl">
      <header className="likud-header">
        <h1>🗳️ תוצאות מועצות סניפים - ליכוד 2026</h1>
        <p className="likud-subtitle">
          סה"כ {data.length - 1} רשימות | {withData} עם תוצאות | {withoutData} ללא תוצאות
        </p>
      </header>

      <div className="likud-controls">
        <div className="likud-filters">
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active' : ''}
          >
            הכל ({data.length - 1})
          </button>
          <button
            onClick={() => setFilter('with-data')}
            className={filter === 'with-data' ? 'active green' : ''}
          >
            עם תוצאות ({withData})
          </button>
          <button
            onClick={() => setFilter('without-data')}
            className={filter === 'without-data' ? 'active yellow' : ''}
          >
            ללא תוצאות ({withoutData})
          </button>
        </div>

        <div className="likud-actions">
          <input
            type="text"
            placeholder="חפש סניף או שם..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="likud-search"
          />
          <a
            href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`}
            target="_blank"
            rel="noopener noreferrer"
            className="likud-btn-sheets"
          >
            📊 Google Sheets
          </a>
          <button onClick={fetchData} className="likud-btn-refresh">
            🔄 רענן
          </button>
        </div>
      </div>

      <div className="likud-table-container">
        <table className="likud-table">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const status = row[6]
              const rowClass = status === 'יש נתונים' ? 'has-data' : 'no-data'
              
              return (
                <tr key={i} className={rowClass}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell || '-'}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="likud-empty">
            <p>אין נתונים להצגה</p>
          </div>
        )}
      </div>

      <footer className="likud-footer">
        <p>נתונים מעודכנים מ-Google Sheets | לחץ "רענן" לעדכון אחרון</p>
      </footer>
    </div>
  )
}

export default LikudPage
