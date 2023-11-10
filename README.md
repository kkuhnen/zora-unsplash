# Unsplash API Search with Next.js

This is a simple image search application using the Unsplash API.

## Features

- Search functionality using Unsplash API
- Filter results by color
- Sort results by relevance, latest, or editorial
- Pagination for viewing multiple results
- Responsive design for optimal viewing on all device sizes
- Light & dark mode

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js v18
- npm

Note: nvm is provided in the project to ensure the correct version of Node.js is used.

### Installation

A step by step series of examples that tell you how to get a development or production environment running.

1. Clone the respitory
   ```bash
   git clone [repository URL]
   cd zora-unsplash
   ```
1. Set correct version of Node.js using `nvm` (optional)
   ```bash
   nvm use
   ```
1. Install dependencies
   ```bash
   npm install
   ```
1. Get an Unsplash API access key
   - Read more about the Unsplash API [here](https://unsplash.com/documentation#getting-started).
1. Set up environment variables
   - Create a .env.local file in the root directory.
   - Add your Unsplash API access key to `.env.local`:
     ```bash
     UNSPLASH_ACCESS_KEY=[your access key]
     ```
1. Run the application
   - development:
     ```bash
     npm run dev
     ```
   - production:
     ```bash
     npm run build
     npm run start
     ```
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

Instructions on how to use the project after setting it up.

1. Enter a search term in the search box.
1. Press Enter or click the search button.
1. Change the color filter or sort order if desired.
1. Navigate through pages using the pagination controls.
1. Click on an image to view it on Unsplash.

## Built With

- [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) - React framework
- [Unsplash API](https://unsplash.com/developers) - API for image search
- [React Blurhash](https://github.com/woltapp/react-blurhash) - Image placeholder
- [Heroicons](https://heroicons.com/) - SVG icons
- [PostCSS](https://postcss.org/) - CSS preprocessor
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Unit testing framework

## Authors

- [kkuhnen](https://github.com/kkuhnen) - Initial work
