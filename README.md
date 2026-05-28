# Mango

Open-Source Manga reader using the Mangadex API.

## Features

- Browse and search manga titles
- Read manga chapters with image viewer
- Advanced search functionality
- Responsive design with dark theme
- Built with React + TypeScript + Vite
- Styled with Tailwind CSS

## Project Structure

```
src/
├── api/               # Mangadex API integration
├── components/        # Reusable React components
├── pages/            # Page components
├── types/            # TypeScript type definitions
├── App.tsx           # Main app with routing
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/AakarshanManiGiri/Mango.git
cd Mango
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Components

### Pages
- **HomePage** - Browse latest manga updates
- **SearchPage** - Search for manga by title
- **MangaDetailPage** - View manga details and chapters list
- **ReaderPage** - Read manga chapters with page navigation

### API Integration
- Uses the official Mangadex API (https://api.mangadex.org)
- No authentication required
- Supports searching, filtering, and fetching chapter images

### Components
- **MangaCard** - Displays manga covers and basic info
- **SearchBar** - Search input component

## Navigation

- Home page shows latest manga updates
- Search for specific manga titles
- Click on manga to view details and available chapters
- Click on a chapter to start reading
- Use arrow keys or buttons to navigate pages while reading

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## API Documentation

This project uses the Mangadex API. For more information:
- https://api.mangadex.org
- https://mangadex.org

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
