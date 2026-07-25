# Frontend

React + Vite + Three.js + WebXR application for AR Real Estate

## Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Structure

```
src/
├── components/        # React components
├── pages/            # Page components
├── services/         # API services
├── stores/           # Zustand stores
├── types/            # TypeScript types
├── hooks/            # Custom hooks
├── utils/            # Helper functions
├── assets/           # Images, fonts
├── App.tsx           # Main component
└── main.tsx          # Entry point
```

## Features

### Phase 1: MVP
- [x] Project setup
- [ ] Authentication UI
- [ ] Property listing page
- [ ] Property details page
- [ ] User dashboard
- [ ] Image upload

### Phase 2: AR
- [ ] 3D model viewer
- [ ] WebXR integration
- [ ] AR placement

## Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:3000/api/v1
```
