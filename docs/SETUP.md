# Setup Guide

## System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **PostgreSQL**: 14+ (or use Docker)
- **Docker & Docker Compose**: Optional but recommended
- **Git**: For version control

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/valeso/ar-realestate-webapp.git
cd ar-realestate-webapp
```

### 2. Setup Database (Choose One)

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d postgres redis
```

Database URL: `postgresql://postgres:postgres@localhost:5432/ar_realestate`

#### Option B: Local PostgreSQL

```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb ar_realestate

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://username:password@localhost:5432/ar_realestate"
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Edit .env with your configuration
# Important variables:
# - DATABASE_URL (PostgreSQL connection string)
# - JWT_SECRET (generate a random string)
# - AWS_* (for file uploads, optional for MVP)
# - REDIS_URL (if using Redis)

# Run database migrations
npm run db:push

# Seed database with sample data (optional)
npm run db:seed

# Start development server
npm run dev
```

Server should be running at `http://localhost:3000`

### 4. Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo 'VITE_API_URL=http://localhost:3000/api/v1' > .env.local

# Start development server
npm run dev
```

App should be running at `http://localhost:5173`

## Environment Variables

### Backend (.env)

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ar_realestate"

# JWT
JWT_SECRET="your-secure-secret-key-here"
JWT_EXPIRE="7d"
JWT_REFRESH_SECRET="your-secure-refresh-key"
JWT_REFRESH_EXPIRE="30d"

# Server
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# AWS S3 (optional for MVP)
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_S3_BUCKET="bucket-name"
AWS_S3_REGION="us-east-1"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
```

### Frontend (.env.local)

```bash
VITE_API_URL=http://localhost:3000/api/v1
```

## Verification

### Backend

```bash
# Check if server is running
curl http://localhost:3000/health

# Expected response:
# {"status":"OK","timestamp":"2026-07-25T..."}
```

### Frontend

1. Open http://localhost:5173 in browser
2. You should see the AR Real Estate Webapp landing page

### Database

```bash
cd backend

# Open Prisma Studio GUI
npm run db:studio

# This opens a web interface at http://localhost:5555
```

## Docker Setup (Alternative)

If you prefer running everything in Docker:

```bash
# Setup backend
cd backend
cp .env.example .env
# Edit .env as needed

# Build and start all services
cd ..
docker-compose up -d

# Run migrations
docker-compose exec backend npm run db:push
docker-compose exec backend npm run db:seed
```

## Troubleshooting

### PostgreSQL Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check DATABASE_URL in .env
- Use Docker: `docker-compose up -d postgres`

### Port Already in Use

```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Issues

```bash
# Regenerate Prisma client
npm run db:push

# Or reset database (WARNING: loses all data)
npm run db:reset
```

## Next Steps

1. Read the [Development Guide](./DEVELOPMENT.md)
2. Check [API Specification](./API_SPEC.md)
3. Review [Architecture](./ARCHITECTURE.md)
4. Start building features!

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review error logs
3. Create a GitHub issue with details
