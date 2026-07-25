# AR Real Estate Webapp

A modern web application for buying, selling, and renting real estate properties with Augmented Reality visualization capabilities.

## 🎯 Project Vision

Enable real estate professionals and homeowners to showcase properties using immersive AR experiences, allowing potential buyers/renters to visualize properties in their own space or explore them remotely with 3D walkthroughs.

## 📋 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (fast dev experience)
- **TailwindCSS** - Styling
- **Three.js** - 3D rendering
- **@react-three/fiber** - React renderer for Three.js
- **WebXR API** - Augmented Reality
- **React Router** - Navigation
- **Zustand** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Prisma ORM** - Database ORM
- **JWT** - Authentication
- **Multer** - File uploads
- **AWS S3** - Media storage
- **WebSocket (Socket.io)** - Real-time features

### DevOps & Tools
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **ESLint & Prettier** - Code quality
- **Jest** - Testing

## 📁 Project Structure

```
ar-realestate-webapp/
├── frontend/                    # React app
├── backend/                     # Node/Express API
├── docs/                        # Documentation
├── docker-compose.yml
└── README.md
```

## 🚀 Features (Phased Rollout)

### Phase 1: MVP (Weeks 1-2)
- User authentication (signup/login)
- Property CRUD operations
- Property listing page with search/filter
- Property details page
- User dashboard
- Image upload capability

### Phase 2: AR Features (Weeks 3-4)
- 3D property model viewer
- WebXR AR placement in real-world space
- Virtual property tours
- Measurement tool in AR

## 🛠️ Getting Started

See [SETUP.md](./docs/SETUP.md) for detailed installation instructions.

## 📚 Documentation

- **[Architecture Overview](./docs/ARCHITECTURE.md)** - System design
- **[API Specification](./docs/API_SPEC.md)** - REST API endpoints
- **[Setup Guide](./docs/SETUP.md)** - Installation steps
- **[Development Guide](./docs/DEVELOPMENT.md)** - Coding standards

## 📄 License

MIT License
