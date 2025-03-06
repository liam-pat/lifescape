# My Life & Reading Blog

A personal blog built with Astro to share life experiences and book notes.

## 🚀 Project Overview

This is a personal blog website built with Astro and Tailwind CSS. It features:

- A clean, responsive design with dark mode support
- Content collections for life experiences and book reviews
- Full-text search functionality
- RSS feed support

## 📂 Project Structure

```text
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/         # Content collections (life and reading)
│   │   ├── life/        # Life experience posts
│   │   └── reading/     # Book review posts
│   ├── layouts/         # Page layouts
│   └── pages/           # Page routes
│       ├── life/        # Life section pages
│       ├── reading/     # Reading section pages
│       ├── about.astro  # About page
│       └── index.astro  # Home page
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `docker-compose up -d`    | Start the production container                   |
| `docker-compose down`     | Stop the production container                    |

## 🔧 Technologies Used

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Docker](https://www.docker.com/) - For containerization and deployment
- [Pagefind](https://pagefind.app/) - Static site search library

## 📝 Content Management

Content is managed through Markdown files in the `src/content/` directory:

- **Life posts**: Add new life experience posts to `src/content/life/`
- **Reading posts**: Add new book reviews to `src/content/reading/`

Each post should include frontmatter with metadata such as title, date, tags, and description.

## 🌙 Dark Mode

The site includes a dark mode toggle that respects user preferences and saves the selection to localStorage.
