## STILL IN WIP

# AssetScan 📦

> A self-hosted inventory and asset tracking app — built as a fullstack portfolio project.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-Drizzle_ORM-003B57?style=flat-square&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

<!-- Replace with an actual screenshot once styling is complete -->
<!-- ![AssetScan Screenshot](./docs/screenshot.png) -->

---

## About

AssetScan lets you keep track of everything you own — electronics, tools, equipment — organized by category, searchable, and accessible from any device on your network.

Built from scratch as a portfolio piece to demonstrate fullstack development skills, clean architecture, and modern tooling.

---

## Tech Stack

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| TypeScript | Type safety across the entire backend |
| Drizzle ORM | Type-safe database queries and migrations |
| SQLite (→ PostgreSQL) | Local development DB, planned Pi deployment |
| Winston | Structured logging |
| Helmet + CORS | Security middleware |

### Frontend
| Tool | Purpose |
|------|---------|
| React + Vite | Fast, modern frontend tooling |
| Refine | CRUD framework with built-in data providers |
| shadcn/ui | Accessible, composable UI components |
| TanStack Table | Powerful data tables with sorting and filtering |
| TypeScript | End-to-end type safety |

---

## Features

- 📦 **Item Management** — Create, view, edit and delete inventory items
- 🗂️ **Categories** — Organize items with color-coded categories
- 🔍 **Search & Filter** — Real-time search across items and categories
- 📄 **Pagination** — Server-side pagination for large inventories
- 🌙 **Dark Mode** — Full light/dark theme support

### Planned (Roadmap)
- [ ] QR Code generation per item
- [ ] JWT Authentication & user accounts
- [ ] PostgreSQL migration for self-hosted deployment on Raspberry Pi
- [ ] Docker Compose setup for easy deployment
- [ ] Mobile-friendly PWA

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

1. Clone the repository
```bash
git clone https://github.com/YxngDjin/AssetScan.git
cd AssetScan
```

2. Set up the backend
```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

3. Set up the frontend
```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

**backend/.env.example**
```
NODE_ENV=development
PORT=3001
DATABASE_URL=./database.db
LOG_LEVEL=debug
```

**frontend/.env.example**
```
VITE_BACKEND_URL=http://localhost:3001
```

---

## Project Structure

```
AssetScan/
├── backend/
│   ├── src/
│   │   ├── config/         # Logger and app config
│   │   ├── db/             # Database connection and schema
│   │   ├── modules/
│   │   │   ├── controller/ # Request handlers
│   │   │   └── routes/     # Express routers
│   │   └── index.ts        # Entry point
│   └── drizzle/            # Generated migrations
└── frontend/
    └── src/
        ├── components/     # Reusable UI components
        ├── pages/          # Route-level page components
        ├── providers/      # Refine data provider
        └── types/          # Shared TypeScript types
```

---

## Development

```bash
# Run linter
npm run lint

# Format code
npm run format

# Generate a new migration
npm run db:generate

# Open Drizzle Studio
npm run db:studio
```

---

## License

MIT — feel free to use this project as inspiration for your own.
