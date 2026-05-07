# Career Tracker 🚀

A React web app to track job applications with AI-powered career advice using Groq API.

## Features
- Add, edit, delete job applications
- Filter by status (Applied, Interview, Offer, Rejected, Saved)
- Search by title, company, location
- Pagination (5 jobs per page)
- Dark mode toggle
- AI Career Advisor powered by Groq (llama-3.3-70b-versatile)
- Data persists in localStorage

## Setup

1. Install dependencies:
```
npm install
```

2. The `.env` file already has your Groq API key. If you need to change it:
```
REACT_APP_GROQ_API_KEY=your_key_here
```

3. Run the app:
```
npm start
```

The app opens at http://localhost:3000

## Project Structure
```
src/
  App.js              - Main app logic
  App.css             - Global button styles
  index.js            - Entry point
  index.css           - CSS variables & themes
  components/
    Header.js/.css    - Top navbar
    StatsBar.js/.css  - Stats dashboard
    AiAdvisor.js/.css - Groq AI chat
    JobControls.js/.css - Search & filter
    JobList.js/.css   - Job cards list
    JobModal.js/.css  - Add/Edit modal
    Pagination.js/.css - Page navigation
```
