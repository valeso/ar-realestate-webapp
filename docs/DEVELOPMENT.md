# Development Guide

## Local Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/valeso/ar-realestate-webapp.git
   cd ar-realestate-webapp
   ```

2. **Start services with Docker**
   ```bash
   docker-compose up -d
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run db:push
   npm run db:seed
   ```

4. **Setup Frontend (in new terminal)**
   ```bash
   cd frontend
   npm install
   ```

5. **Start development servers**
   
   Backend (in `backend` directory):
   ```bash
   npm run dev
   ```
   
   Frontend (in `frontend` directory):
   ```bash
   npm run dev
   ```

6. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/v1
   - Prisma Studio: `npm run db:studio` (in backend directory)

## Development Workflow

### Creating a Feature

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** following the project structure

3. **Write/update tests**
   ```bash
   npm test
   ```

4. **Format and lint**
   ```bash
   npm run format
   npm run lint
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request** on GitHub

## Backend Development

### Adding a New Route

1. **Create controller** (`src/controllers/featureController.ts`)
   ```typescript
   import { Request, Response } from 'express';
   
   export const getFeature = async (req: Request, res: Response) => {
     // Logic here
   };
   ```

2. **Create route** (`src/routes/featureRoutes.ts`)
   ```typescript
   import { Router } from 'express';
   import { getFeature } from '../controllers/featureController';
   
   const router = Router();
   router.get('/', getFeature);
   export default router;
   ```

3. **Register in server.ts**
   ```typescript
   import featureRoutes from './routes/featureRoutes';
   app.use('/api/v1/features', featureRoutes);
   ```

### Database Migrations

1. **Update Prisma schema** (`prisma/schema.prisma`)
2. **Create migration**
   ```bash
   npm run db:migrate
   ```
3. **Push to database**
   ```bash
   npm run db:push
   ```

## Frontend Development

### Creating a New Page

1. **Create page component** (`src/pages/FeaturePage.tsx`)
   ```typescript
   import React from 'react';
   
   const FeaturePage: React.FC = () => {
     return <div>Feature Page</div>;
   };
   
   export default FeaturePage;
   ```

2. **Add route** in `App.tsx`
   ```typescript
   import FeaturePage from '@/pages/FeaturePage';
   
   <Route path="/feature" element={<FeaturePage />} />
   ```

### Creating a Component

1. **Create component** (`src/components/FeatureComponent.tsx`)
   ```typescript
   import React from 'react';
   
   interface Props {
     title: string;
   }
   
   const FeatureComponent: React.FC<Props> = ({ title }) => {
     return <div>{title}</div>;
   };
   
   export default FeatureComponent;
   ```

### Using Services

```typescript
import { propertyService } from '@/services/propertyService';

const properties = await propertyService.getProperties({ page: 1 });
```

### Using Stores (Zustand)

```typescript
import { useAuthStore } from '@/stores/authStore';

const { user, logout } = useAuthStore();
```

## Code Style

### Naming Conventions
- **Files**: camelCase for components, kebab-case for utilities
- **Variables**: camelCase
- **Classes/Types**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

### TypeScript
- Always specify function return types
- Use interfaces over types (except for unions/generics)
- Avoid `any`, use `unknown` if needed

### React
- Use functional components with hooks
- Export default for page components
- Use named exports for reusable components

## Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:watch
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Debugging

### Backend
- Check logs: `docker-compose logs -f backend`
- Use `console.log` (will see in terminal)
- Debug mode: Use VS Code debugger with launch config

### Frontend
- React DevTools browser extension
- Console in browser DevTools
- Network tab for API calls

## Troubleshooting

### Database connection issues
```bash
# Check if postgres is running
docker-compose logs postgres

# Recreate services
docker-compose down
docker-compose up -d
```

### Port already in use
```bash
# Find and kill process on port
lsof -i :3000  # for backend
lsof -i :5173  # for frontend
kill -9 <PID>
```

### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Useful Commands

```bash
# Backend
cd backend
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter
npm run format           # Format code
npm run db:studio        # Open Prisma Studio

# Frontend
cd frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter
npm run format           # Format code
npm run type-check       # Check TypeScript
```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [WebXR API](https://immersiveweb.github.io/webxr/)
- [Tailwind CSS](https://tailwindcss.com/)
