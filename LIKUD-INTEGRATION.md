# Likud Election Data Integration

## Google Sheet
**Sheet ID:** `1oINu6aCW38HJ4hI5ZiKf8C83zuBWf4I6GRGs6z9yfNc`

**URL:** https://docs.google.com/spreadsheets/d/1oINu6aCW38HJ4hI5ZiKf8C83zuBWf4I6GRGs6z9yfNc/edit

## Data Structure

### Columns (A-K)
1. **סניף** - Branch name
2. **ראש רשימה** - List leader
3. **מועמדים** - Number of candidates
4. **קולות** - Votes (from official results)
5. **אחוז** - Percentage
6. **דירוג** - Ranking
7. **סטטוס** - Status: "יש נתונים" / "אין נתונים"
8. **סיבה (ללא בחירות)** - Reason for no election (manual entry)
9. **קולות ידניים** - Manual vote count (manual entry)
10. **הערות** - Notes (manual entry)
11. **תאריך עדכון** - Last update date (manual entry)

### Row Count
- Total: 201 lists (202 including header)
- With results: 93
- Without results: 108

## Integration Plan

### Phase 1: Read-only Display
- Add new page: `/likud`
- Fetch data from Google Sheets API
- Display in filterable table
- Filters: סטטוס, סניף

### Phase 2: Edit Interface
- Form for "אין נתונים" rows
- Fields: סיבה, קולות ידניים, הערות
- Save back to Google Sheets
- Auto-update תאריך עדכון

### Phase 3: Export
- Download as Excel
- Upload Excel to update Sheet

## API Setup

### Google Sheets API
```bash
# Install Google APIs client
npm install googleapis
```

### Environment Variables
```env
GOOGLE_SHEET_ID=1oINu6aCW38HJ4hI5ZiKf8C83zuBWf4I6GRGs6z9yfNc
GOOGLE_API_KEY=<your-api-key>
# OR use OAuth for write access
```

### Read Data (Public)
```javascript
const SHEET_ID = '1oINu6aCW38HJ4hI5ZiKf8C83zuBWf4I6GRGs6z9yfNc';
const RANGE = 'Sheet1!A1:K202';
const API_KEY = process.env.GOOGLE_API_KEY;

const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
const response = await fetch(url);
const data = await response.json();
```

### Write Data (OAuth required)
Use `gog` CLI or Google APIs client library with OAuth.

## Next Steps
1. Make Sheet public (read-only) or set up API key
2. Add Likud page to dashboard
3. Implement read/display
4. Add edit form
5. Test full workflow
