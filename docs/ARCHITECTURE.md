# Architecture Overview

## System Design

The AR Real Estate Webapp is built using a modern, scalable architecture with clear separation of concerns between frontend and backend.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
├─────────────────────────────────────────────────────────────┤
│  React 18 + TypeScript + Vite                               │
│  ├── Pages (Authentication, Properties, Dashboard)          │
│  ├── Components (Reusable UI components)                    │
│  ├── Services (API communication)                           │
│  ├── Stores (Zustand state management)                      │
│  └── AR Module (Three.js + WebXR)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/WebSocket
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     API Gateway                              │
├─────────────────────────────────────────────────────────────┤
│  Express.js Server (Port 3000)                              │
│  ├── Authentication Routes                                  │
│  ├── Property Routes                                        │
│  ├── Message Routes                                         │
│  ├── User Routes                                            │
│  └── AR Session Routes                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼────────┐ ┌─────▼─────┐ ┌──────▼───────┐
│   PostgreSQL   │ │   Redis   │ │    AWS S3    │
│   Database     │ │   Cache   │ │  File Store  │
└────────────────┘ └───────────┘ └──────────────┘
```

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **File Storage**: AWS S3
- **Task Queue**: Bull
- **Authentication**: JWT (JSON Web Tokens)

### Directory Structure

```
backend/
├── src/
│   ├── server.ts              # Express app initialization
│   ├── middleware/
│   │   ├── errorHandler.ts    # Global error handling
│   │   ├── notFoundHandler.ts # 404 handler
│   │   ├── auth.ts            # JWT authentication
│   │   └── validation.ts      # Input validation
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── propertyController.ts
│   │   ├── messageController.ts
│   │   └── userController.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── propertyRoutes.ts
│   │   ├── messageRoutes.ts
│   │   └── userRoutes.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── propertyService.ts
│   │   ├── fileService.ts    # AWS S3 operations
│   │   └── emailService.ts
│   ├── models/               # Prisma models (via schema.prisma)
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   └── utils/
│       ├── validators.ts      # Input validation helpers
│       └── helpers.ts         # Utility functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── tests/                     # Test files
├── .env.example               # Environment variables template
├── tsconfig.json
├── package.json
└── Dockerfile
```

### API Layer

**Request Flow:**
```
Request → Express → Middleware → Route → Controller → Service → Database
                                    ↓
                            Response → Client
```

**Key Middleware:**
- Authentication (JWT verification)
- Error handling
- Request validation
- CORS handling
- Rate limiting
- Logging (Morgan)

## Frontend Architecture

### Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **AR**: WebXR API
- **Maps**: React Leaflet
- **HTTP Client**: Axios

### Directory Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── PropertyListPage.tsx
│   │   ├── PropertyDetailPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ARViewerPage.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── property/
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── PropertyFilter.tsx
│   │   │   └── PropertyForm.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── ar/
│   │       ├── ARViewer.tsx
│   │       ├── ModelLoader.tsx
│   │       └── MeasurementTool.tsx
│   ├── services/
│   │   ├── api.ts             # Axios instance
│   │   ├── authService.ts
│   │   ├── propertyService.ts
│   │   └── arService.ts
│   ├── stores/
│   │   ├── authStore.ts       # Auth state (Zustand)
│   │   ├── propertyStore.ts   # Property state
│   │   └── arStore.ts         # AR session state
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProperties.ts
│   │   └── useAR.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── assets/                # Images, icons, etc.
│   ├── App.tsx                # Main component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static files
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Component Hierarchy

```
App
├── Router
│   ├── HomePage
│   ├── AuthPages
│   │   ├── LoginPage
│   │   └── RegisterPage
│   ├── PropertyPages
│   │   ├── PropertyListPage
│   │   │   └── PropertyCard (repeated)
│   │   └── PropertyDetailPage
│   ├── DashboardPage
│   │   └── PropertyForm
│   └── ARViewerPage
│       ├── ARViewer
│       ├── ModelLoader
│       └── MeasurementTool
└── Common Components
    ├── Header
    ├── Navigation
    └── Footer
```

## Data Flow

### Authentication Flow

```
1. User submits credentials
   ↓
2. Frontend sends POST /auth/login
   ↓
3. Backend validates credentials against database
   ↓
4. Backend generates JWT token
   ↓
5. Frontend stores token in localStorage
   ↓
6. Subsequent requests include Authorization header with token
```

### Property Listing Flow

```
1. User navigates to properties page
   ↓
2. Frontend calls propertyService.getProperties()
   ↓
3. Axios sends GET /api/v1/properties?filters
   ↓
4. Backend receives request with filters
   ↓
5. Controller queries database via Prisma
   ↓
6. Database returns matching properties
   ↓
7. Backend sends JSON response with properties
   ↓
8. Frontend updates Zustand store
   ↓
9. Components re-render with new data
```

### File Upload Flow

```
1. User selects image in form
   ↓
2. Frontend creates FormData with file
   ↓
3. Frontend sends POST /api/v1/properties with FormData
   ↓
4. Backend receives file via Multer middleware
   ↓
5. Backend uploads to AWS S3
   ↓
6. Backend stores S3 URL in database
   ↓
7. Frontend receives property with image URL
   ↓
8. Frontend displays image
```

## Database Schema

### Key Tables

```
users
├── id (PK)
├── email (UNIQUE)
├── password_hash
├── full_name
├── role (BUYER, SELLER, ADMIN)
└── timestamps

properties
├── id (PK)
├── user_id (FK → users)
├── title
├── description
├── price
├── property_type
├── address
├── latitude, longitude
├── created_at

property_images
├── id (PK)
├── property_id (FK → properties)
├── url
└── order

messages
├── id (PK)
├── sender_id (FK → users)
├── recipient_id (FK → users)
├── property_id (FK → properties, nullable)
├── content
├── read
└── created_at

favorites
├── id (PK)
├── user_id (FK → users)
├── property_id (FK → properties)
└── unique(user_id, property_id)

ar_sessions
├── id (PK)
├── user_id (FK → users)
├── property_id (FK → properties)
├── duration_seconds
├── actions (JSON array)
└── created_at
```

## Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Used for stateless authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Token Expiry**: Short-lived access tokens (7 days)
- **Refresh Tokens**: Long-lived tokens for session renewal (30 days)
- **Role-Based Access Control**: BUYER, SELLER, ADMIN roles

### Data Protection
- **HTTPS Only**: All communications encrypted
- **CORS**: Restricted to trusted origins
- **Input Validation**: Zod schemas for request validation
- **SQL Injection Prevention**: Prisma parameterized queries
- **XSS Prevention**: React's built-in XSS protection

### Infrastructure Security
- **Rate Limiting**: Express-rate-limit on API endpoints
- **Helmet**: Security headers via Express Helmet middleware
- **Environment Variables**: Sensitive data in .env files
- **AWS S3 Bucket Policies**: Restricted file access

## Scalability Considerations

### Current Architecture (MVP)
- Single Express server
- PostgreSQL primary database
- Redis for caching
- AWS S3 for file storage

### Future Enhancements
1. **Load Balancing**: Multiple Express instances behind load balancer
2. **Database Replication**: Read replicas for better performance
3. **Microservices**: Separate services for auth, properties, messaging
4. **Message Queue**: Bull/Redis for async job processing
5. **CDN**: CloudFront for static asset delivery
6. **Caching Layer**: Redis for frequently accessed data

## Deployment Architecture

### Development
- Local Docker containers for database/cache
- npm dev servers for frontend and backend

### Staging/Production
- Docker containers on Railway (backend)
- Vercel for frontend deployment
- PostgreSQL managed database
- AWS S3 for file storage
- CloudFlare for CDN and DDoS protection

## Performance Optimization

### Frontend
- Code splitting via Vite
- Lazy loading for routes
- Image optimization
- Memoization for expensive components
- Virtual scrolling for large lists

### Backend
- Database indexing on frequently queried columns
- Redis caching for user sessions
- Query optimization with Prisma
- Pagination for list endpoints
- Gzip compression for responses

## Error Handling

### Backend Error Flow
```
Error occurs in controller/service
     ↓
Error caught and wrapped in AppError
     ↓
Error handler middleware catches it
     ↓
Responds with structured error JSON
     ↓
Frontend receives error response
     ↓
Frontend displays user-friendly message
```

### Error Response Format
```json
{
  "error": "ERROR_CODE",
  "message": "Human readable message",
  "details": {
    "field": "error description"
  }
}
```

## Monitoring & Logging

### Backend Logging
- Morgan for HTTP request logging
- Console logs for debugging
- Error tracking (future: Sentry)

### Frontend Analytics
- User interaction tracking
- AR session analytics
- Error reporting (future)

---

This architecture is designed to be scalable, maintainable, and secure while providing a great user experience for real estate browsing and AR visualization.
