# 🚀 ReleaseCheck

ReleaseCheck is a full-stack release checklist management application that helps developers track software releases and monitor the completion of release steps.

The application allows users to create releases, manage release checklists, update release information, and automatically determine the release status based on completed steps.

[Frontend Deployed Link](https://release-checklist-frontend-seven.vercel.app/)

[Backend Deployed Link](https://release-checklist-gilt.vercel.app/)

## Repository Architecture

The project is structured as a monorepo containing two separate applications:

```text
release-checklist/
├── frontend/                 # Client application (Next.js 16, React 19, Tailwind CSS 4)
│   ├── src/
│   │   ├── app/              # Next.js App Router (Layouts & Main Page)
│   │   ├── components/       # ReleaseList, ReleaseDetails, ReleaseModal components
│   │   ├── services/         # API client service layer (releaseService)
│   │   ├── types/            # TypeScript interfaces & types
│   │   └── constants/        # API configuration & base URL settings
│   ├── package.json
│   └── tsconfig.json
├── server/                   # API Server (Express.js, TypeScript, Prisma ORM)
│   ├── src/
│   │   ├── controllers/      # Express route request handlers
│   │   ├── routes/           # API endpoints routing definition
│   │   ├── services/         # Business logic layer
│   │   ├── repositories/     # Data access layer (Prisma Client queries)
│   │   ├── app.ts            # Express application setup
│   │   └── server.ts         # Server bootstrapper
│   ├── prisma/               # Database schema definitions & migrations
│   ├── package.json
│   └── tsconfig.json
├── .gitignore                # Root Git ignore rules (node_modules, .env, build outputs)
└── README.md                 # Main workspace documentation
```

---

## 🚀 Tech Stack

### **Frontend (`/frontend`)**

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: React Icons (`react-icons`)
- **Language**: TypeScript

### **Backend (`/server`)**

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database ORM**: [Prisma ORM 6](https://www.prisma.io/)
- **Database**: PostgreSQL (Neon Database / Cloud PostgreSQL)
- **Dev Runner**: `tsx`
- **Language**: TypeScript

---

## 🛠️ Environment Configuration

### **Backend Environment Setup**

Create a `.env` file in the `server/` directory:

```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/release_checklist_db?sslmode=require"
```

### **Frontend Environment Setup**

Optionally create a `.env` file in the `frontend/` directory (defaults to `http://localhost:5000/api` if omitted):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚦 Getting Started

### **1. Clone & Prerequisites**

Ensure you have **Node.js** (v18+) and **pnpm** (or `npm` / `yarn`) installed.

### **2. Setup and Run the Backend Server**

```bash
# Navigate to the server directory
cd server

# Install dependencies
pnpm install

# Apply database migrations / push Prisma schema
pnpm dlx prisma db push

# Start the development server
pnpm dev
```

The backend API server will start on `http://localhost:5000`.

### **3. Setup and Run the Frontend Client**

Open a new terminal tab/window:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
pnpm install

# Start the Next.js development server
pnpm run dev
```

The frontend application will be accessible at `http://localhost:3000`.

---

## 📡 API Endpoints Summary

| Method   | Endpoint                      | Description                                                            |
| :------- | :---------------------------- | :--------------------------------------------------------------------- |
| `GET`    | `/`                           | API Health Check                                                       |
| `GET`    | `/api/releases`               | Fetch all releases with associated release steps and calculated status |
| `GET`    | `/api/releases/:id`           | Fetch details of a specific release by ID                              |
| `POST`   | `/api/releases`               | Create a new release (automatically initializes release steps)         |
| `PATCH`  | `/api/releases/:id`           | Update release information (e.g. additional info)                      |
| `PATCH`  | `/api/releases/steps/:stepId` | Toggle completion status of a release step                             |
| `DELETE` | `/api/releases/:id`           | Delete a release and its associated steps                              |

---

## 🌐 Deploying Express Server on Vercel

The Express server is configured for seamless zero-config / serverless deployment on Vercel:

### Deploying via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/new) and import your Git repository (`AnchalDevBytes/release-checklist`).
2. Set **Root Directory** to `server`.
3. In **Environment Variables**, add:
   - `DATABASE_URL`: Your PostgreSQL connection string.
4. Click **Deploy**.

Similiarly for the frontend

---
