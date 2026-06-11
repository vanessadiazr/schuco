
# Countries App

## Description
Angular application that consumes the REST Countries API and displays a list of countries with relevant information.

The application focuses on clean code structure, simplicity, and handling real-world data scenarios.

---

## Features

- Fetch data from REST Countries API
- Display countries in a table
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
  - Supports ascending/descending sort
  - Handles international characters (e.g. Å, accents)
  - Ensures "N/A" values are always placed at the end

---

## Technical Approach

- Angular standalone components
- Separation of concerns:
  - Services for API calls
  - Components for UI logic
- Use of TypeScript models
- Use of RxJS for handling asynchronous data
- Clean and reusable sorting logic
- Use of `localeCompare` for proper string sorting

---

## UI

- Simple and clean table layout
- Responsive and readable design
- SCSS styling
- Hover effects and visual feedback
- Loading and error states

---

## Tech Stack

- Angular
- TypeScript
- SCSS
- REST API (https://restcountries.com/)

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
