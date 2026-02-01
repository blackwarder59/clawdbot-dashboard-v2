function LikudTable({ headers, rows }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" dir="rtl">
          <thead className="bg-blue-600 text-white">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-4 py-3 text-right font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rows.map((row, i) => {
              const status = row[6]
              const rowClass = status === 'יש נתונים' 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-yellow-50 dark:bg-yellow-900/20'
              
              return (
                <tr key={i} className={`${rowClass} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {cell || '-'}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {rows.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          אין נתונים להצגה
        </div>
      )}
    </div>
  )
}

export default LikudTable
