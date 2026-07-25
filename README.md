# AR Real Estate Webapp

A modern web application for real estate listings with augmented reality (AR) visualization capabilities. Built with React, Node.js, Three.js, and WebXR.

## 🚀 Features

### Phase 1: MVP
- **User Authentication**: Secure signup/login with JWT
- **Property Listings**: Browse properties with filtering and search
- **Property Details**: View detailed property information
- **User Dashboard**: Seller dashboard for property management
- **Real-time Messaging**: Direct messaging between buyers and sellers
- **Favorites**: Save favorite properties

### Phase 2: AR Integration
- **3D Model Viewer**: Interactive 3D property visualization
- **WebXR Support**: Place models in real-world space using AR
- **Measurements**: Measure distances and dimensions in AR
- **AR Analytics**: Track user AR interactions

### Phase 3: Advanced Features
- **AI-Powered Recommendations**: Personalized property suggestions
- **Virtual Tours**: 360° property tours
- **Video Calling**: In-app video calls between buyers and sellers
- **Advanced Analytics**: Seller analytics dashboard

## 📋 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **3D Graphics**: Three.js
- **AR**: WebXR API
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Authentication**: JWT
- **File Storage**: AWS S3
- **Task Queue**: Bull

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Railway (backend), Vercel (frontend)

## 🏗️ Project Structure

```
ar-realestate-webapp/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── server.ts       # Express app entry
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Helper functions
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Seed script
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── frontend/                # React/Vite app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── stores/         # Zustand stores
│   │   ├── types/          # TypeScript types
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utilities
│   │   ├── App.tsx         # Main component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
│
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md      # System architecture
│   ├── API_SPEC.md          # API specification
│   ├── SETUP.md             # Setup instructions
│   └── DEVELOPMENT.md       # Development guide
│
├── docker-compose.yml       # Local development setup
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/valeso/ar-realestate-webapp.git
   cd ar-realestate-webapp
   ```

2. **Start database services**
   ```bash
   docker-compose up -d postgres redis
   ```

3. **Setup backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run db:push
   npm run db:seed
   npm run dev
   ```

4. **Setup frontend (new terminal)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - API Docs: http://localhost:3000/api/v1

See [SETUP.md](./docs/SETUP.md) for detailed installation instructions.

## 📚 Documentation

- **[Architecture](./docs/ARCHITECTURE.md)** - System design and data flow
- **[API Specification](./docs/API_SPEC.md)** - Complete API endpoint documentation
- **[Setup Guide](./docs/SETUP.md)** - Installation and configuration
- **[Development Guide](./docs/DEVELOPMENT.md)** - Development workflow and best practices

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev              # Start dev server
npm run lint             # Run linter
npm run format           # Format code
npm run db:studio        # Open Prisma Studio
npm test                 # Run tests
```

### Frontend Development
```bash
cd frontend
npm run dev              # Start dev server
npm run lint             # Run linter
npm run format           # Format code
npm run type-check       # Check TypeScript
npm run build            # Build for production
```

## 📁 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `POST /api/v1/auth/logout` - Logout user

### Properties
- `GET /api/v1/properties` - List properties with filters
- `GET /api/v1/properties/:id` - Get property details
- `POST /api/v1/properties` - Create property (seller only)
- `PUT /api/v1/properties/:id` - Update property
- `DELETE /api/v1/properties/:id` - Delete property

### Messages
- `GET /api/v1/messages` - Get conversations
- `GET /api/v1/messages/:conversation_id` - Get message history
- `POST /api/v1/messages` - Send message

### Favorites
- `GET /api/v1/favorites` - Get favorite properties
- `POST /api/v1/favorites/:property_id` - Add to favorites
- `DELETE /api/v1/favorites/:property_id` - Remove from favorites

See [API_SPEC.md](./docs/API_SPEC.md) for complete documentation.

## 🔐 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/ar_realestate
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000/api/v1
```

## 📦 Docker

### Run all services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
```

### Frontend
```bash
cd frontend
npm test                 # Run all tests
```

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

See [DEVELOPMENT.md](./docs/DEVELOPMENT.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Valeso** - [@valeso](https://github.com/valeso)

## 🙋 Support

For issues and questions:
1. Check existing [GitHub Issues](https://github.com/valeso/ar-realestate-webapp/issues)
2. Create a new issue with detailed information
3. Check the [documentation](./docs/)

## 🎯 Roadmap

- [x] Project structure setup
- [x] Backend scaffolding
- [x] Frontend scaffolding
- [x] Database schema
- [ ] Authentication implementation
- [ ] Property listing features
- [ ] Real-time messaging
- [ ] 3D model viewer
- [ ] WebXR integration
- [ ] Advanced filtering
- [ ] Analytics dashboard
- [ ] Mobile app

---

**Happy coding! 🚀**
