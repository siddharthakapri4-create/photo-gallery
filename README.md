# Lumina Photo Gallery

Lumina Photo Gallery is a responsive, client-side photography application built with React and Vite. It provides a curated gallery, advanced filtering and sorting, artwork details, favorites, theme switching, public photo publishing, and a demo administration dashboard.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [Demo Administrator Account](#demo-administrator-account)
- [Data and Persistence](#data-and-persistence)
- [Project Structure](#project-structure)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Security and Storage Notice](#security-and-storage-notice)
- [Browser Support](#browser-support)
- [Contributing](#contributing)

## Overview

Lumina presents local and remote photographic artwork in a modern gallery interface. Gallery data and user interactions are managed entirely in the browser through React Context, with no server-side database or API required.

## Features

- Responsive grid and masonry gallery layouts
- Search by title, artist, or tag
- Category, orientation, and popularity filtering
- Sorting by popularity, publication date, or title
- Detailed artwork and technical EXIF metadata views
- Keyboard-accessible lightbox navigation
- Persistent favorites
- Light and dark themes
- Image URL publishing with live preview
- Curated image presets
- Protected demo administrator dashboard
- Custom artwork editing and deletion
- Related artwork recommendations
- Toast notifications for user actions

## Technology Stack

| Technology | Purpose |
| --- | --- |
| React 18 | Component-based user interface |
| React Router DOM 6 | Client-side routing |
| Vite 5 | Development server and production bundling |
| Context API | Authentication and gallery state management |
| Lucide React | Interface icons |
| Browser Local Storage | Persistent client-side data |
| CSS | Responsive layout and theming |

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/siddharthakapri4-create/photo-gallery.git
   cd photo-gallery
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in a browser.

The Vite configuration starts the development server on port `3000` and opens it automatically.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for verification |

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Main gallery |
| `/photo/:id` | Individual artwork details |
| `/favorites` | Saved favorite artworks |
| `/upload` | Publish a new artwork |
| `/about` | React concepts and implementation guide |
| `/login` | Administrator sign-in |
| `/admin` | Protected administrator dashboard |

## Demo Administrator Account

Use the following credentials to access the demo dashboard:

```text
Email: admin@lumina.art
Password: admin123
```

The credentials are intentionally hardcoded for demonstration purposes. They must not be used to protect production data or exposed administrative resources.

## Data and Persistence

The application has no backend. Gallery and account state are stored in browser local storage.

| Local Storage Key | Contents |
| --- | --- |
| `lumina_admin_logged_in` | Administrator session status |
| `lumina_admin_user` | Stored administrator profile |
| `lumina_user_photos` | Published custom artworks |
| `lumina_favorites` | Favorite artwork IDs |
| `lumina_theme` | Selected light or dark theme |

Clearing browser site data removes custom artworks, favorites, theme preferences, and the demo login state. Custom artwork image URLs must remain accessible to the browser.

## Project Structure

```text
Art_Gallery/
├── public/                  # Public static image assets
├── src/
│   ├── components/          # Reusable interface components
│   ├── context/             # Gallery and authentication contexts
│   ├── data/                # Initial artwork and filter datasets
│   ├── pages/               # Route-level pages
│   ├── App.jsx              # Application routes and providers
│   ├── index.css            # Global styles and theme variables
│   └── main.jsx             # React entry point
├── index.html               # Vite HTML entry
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and npm scripts
└── package-lock.json        # Reproducible dependency versions
```

## Building for Production

Create the optimized production bundle:

```bash
npm run build
```

Vite writes the generated application to `dist/`. Preview the bundle locally:

```bash
npm run preview
```

## Deployment

Deploy the contents of `dist/` to a static hosting provider. Because the application uses browser-side routing, configure the host to rewrite unknown routes to `index.html`.

Example deployment platforms include:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static web server

## Security and Storage Notice

This project is a front-end demonstration:

- Administrator authentication is client-side only.
- Credentials are visible in application source code.
- Data can be modified or cleared by the browser user.
- There is no server authorization, database, file upload service, or secure session.

Do not use this implementation to manage confidential collections or production administrator access. A production system requires a secure backend, hashed credentials, server-side authorization, and persistent storage.

## Browser Support

Lumina supports current versions of:

- Microsoft Edge
- Google Chrome
- Mozilla Firefox
- Apple Safari

## Contributing

1. Create a feature branch from the main branch.
2. Keep changes focused and consistent with the existing React patterns.
3. Run `npm run build` before submitting a change.
4. Submit a pull request with a concise description and testing information.
