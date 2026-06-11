
# Countries App

## Description
This project is an Angular application that displays a list of countries with relevant information.

The application integrates with the REST Countries API. Due to changes in the API (deprecation of versions up to v4), a backend layer was introduced to handle authentication and data retrieval from the current v5 version.

The backend acts as a proxy between the frontend and the external API, ensuring secure handling of the authorization header and allowing for data transformation when needed.

---

## Features

- Fetch country data via a custom backend API
- Display countries in a structured table
- Show:
  - Official country name
  - Capital
  - Currency (formatted)
  - Population
  - Area
  - Population density (calculated field)

- Handle edge cases:
  - Missing data (e.g. no capital or currency)
  - Display "N/A" for unavailable values

- Sorting functionality:
  - Sort by name, capital, currency, population, area, and density
  - Supports ascending/descending order
  - Handles international characters (e.g. Å, accents)
  - Ensures "N/A" values are always placed at the end

---

## Architecture

- **Frontend**: Angular application (GitHub Pages)
- **Backend**: Node.js (Express) deployed on Render

The backend:
- Adds the required authorization header for API v5
- Fetches data from the external API
- Normalizes the response structure
- Sends a simplified dataset to the frontend

---

## Data Loading

Currently, the application retrieves only the first 25 countries.

---

## UI

- Clean and simple table layout
- Responsive design
- SCSS styling
- Hover effects for better UX
- Loading and error states

---

## Tech Stack

- Angular
- TypeScript
- SCSS
- Node.js (Express)
- REST API (https://restcountries.com/)
- Render (backend hosting)
- GitHub Pages (frontend hosting)

---

## Deployment

- Frontend:  
  https://vanessadiazr.github.io/schuco/

- Backend API:  
  https://schuco-api.onrender.com/api/countries

> Note: The backend is hosted on Render’s free tier and may take a few seconds to respond if it has been idle.

---

## Development

### Start development server

```bash
ng serve
```

The backend is a Node.js (Express) application that acts as a proxy between the frontend and the external REST Countries API.

### Start server locally

```bash
cd backend
npm install
node server.js
```

