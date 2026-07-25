# Backend API

Node.js + Express API for AR Real Estate Webapp

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run db:push
npm run dev
```

## Structure

```
src/
├── server.ts           # Express app entry point
├── middleware/         # Express middleware
├── routes/            # API route handlers
├── controllers/       # Business logic
├── services/          # Database/external services
├── models/            # Database models (via Prisma)
├── types/             # TypeScript interfaces
└── utils/             # Helper functions
```

## Database

Using Prisma ORM with PostgreSQL

### Commands
```bash
npm run db:migrate    # Create and run migrations
npm run db:push       # Push schema to database
npm run db:studio     # Open Prisma Studio GUI
npm run db:seed       # Populate with sample data
```

## Environment Variables

Copy `.env.example` to `.env` and update:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for signing tokens
- `AWS_*` - AWS S3 credentials
- `REDIS_URL` - Redis connection string

## API Documentation

See [API_SPEC.md](../docs/API_SPEC.md) for complete endpoint documentation.
