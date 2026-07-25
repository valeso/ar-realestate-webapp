# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                              │
├─────────────────────────────────────────────────────────────────┤
│  React App (Vite)                                               │
│  ├── Pages (Listings, Details, Dashboard, Auth)                │
│  ├── Components (Property Card, AR Viewer, Map)                │
│  ├── Services (API calls)                                      │
│  └── Stores (Zustand state management)                         │
│                                                                 │
│  AR Module (Three.js + WebXR)                                  │
│  ├── 3D Model Loader                                           │
│  ├── AR Session Manager                                        │
│  └── Gesture Recognition                                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    HTTPS / WebSocket
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        API TIER (Node.js/Express)               │
├─────────────────────────────────────────────────────────────────┤
│  Routes                                                         │
│  ├── /auth (signup, login, logout)                             │
│  ├── /properties (CRUD)                                        │
│  ├── /users (profile, settings)                                │
│  ├── /messages (real-time chat)                                │
│  └── /search (advanced filtering)                              │
│                                                                 │
│  Controllers → Services → Middleware                           │
│  ├── Authentication (JWT)                                      │
│  ├── Authorization                                             │
│  └── Error Handling                                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
        PostgreSQL / S3 / External Services
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA & STORAGE TIER                          │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL (Primary DB)                                        │
│  ├── Users                                                      │
│  ├── Properties                                                │
│  ├── Images                                                    │
│  ├── Messages                                                  │
│  └── Favorites                                                 │
│                                                                 │
│  AWS S3 (Media Storage)                                        │
│  ├── Property Photos                                           │
│  ├── 3D Models                                                 │
│  └── User Avatars                                              │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Property Upload Flow
1. User uploads property photos via frontend
2. Frontend compresses images
3. Backend receives images and uploads to S3
4. Backend stores S3 URLs in database
5. Optional: Auto-generate 3D model from photos
6. Response with property ID and preview URLs

### AR Viewing Flow
1. User navigates to property AR view
2. Frontend loads 3D model from S3
3. WebXR session initiates
4. User places model in real-world space
5. User can rotate, scale, measure
6. Session data sent to backend for analytics

### Real-time Messaging
1. User sends message via WebSocket
2. Backend broadcasts to recipient
3. Message stored in database
4. Recipient receives notification

## Database Schema Overview

```
Users
├── id (PK)
├── email (unique)
├── password_hash
├── full_name
├── avatar_url
├── role (seller, buyer, admin)
├── created_at

Properties
├── id (PK)
├── user_id (FK) → Users
├── title
├── description
├── price
├── property_type (house, apartment, commercial)
├── location (lat, lng, address)
├── images (array of URLs)
├── 3d_model_url
├── bedrooms
├── bathrooms
├── square_feet
├── created_at
├── updated_at

PropertyImages
├── id (PK)
├── property_id (FK) → Properties
├── image_url
├── order

Messages
├── id (PK)
├── sender_id (FK) → Users
├── recipient_id (FK) → Users
├── property_id (FK) → Properties (optional)
├── content
├── read
├── created_at

Favorites
├── id (PK)
├── user_id (FK) → Users
├── property_id (FK) → Properties
├── created_at
```

## Security Considerations

- **Authentication**: JWT tokens with refresh rotation
- **Authorization**: Role-based access control (RBAC)
- **File Upload**: Validate MIME types, virus scan, size limits
- **CORS**: Restrict to frontend domain
- **Rate Limiting**: Prevent abuse
- **Data Encryption**: Sensitive fields encrypted at rest
- **HTTPS**: All connections encrypted in transit

## Scalability Strategy

1. **Horizontal Scaling**: Stateless Express servers behind load balancer
2. **Caching**: Redis for session storage and query caching
3. **CDN**: CloudFront for static assets and media
4. **Database**: Read replicas for read-heavy operations
5. **Queue System**: Bull or RabbitMQ for async jobs (image processing)
6. **Monitoring**: DataDog or New Relic for performance tracking

## Deployment Architecture

```
GitHub → CI/CD (GitHub Actions) → Build & Test
                                  ↓
                        ┌─────────────────────┐
                        │   Dev Environment   │
                        └─────────────────────┘
                                  ↓ (on main)
                        ┌─────────────────────┐
                        │  Prod Environment   │
                        ├─────────────────────┤
                        │ Vercel (Frontend)   │
                        │ Railway (Backend)   │
                        │ AWS RDS (DB)        │
                        │ AWS S3 (Storage)    │
                        └─────────────────────┘
```
