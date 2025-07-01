# Flowmatik - AI Content Generation Platform

A professional, scalable web application for automated AI content generation with a cyberpunk/neon design.

## 🚀 Features

- **React + Tailwind Frontend** with cyberpunk/neon design
- **Node.js + Express Backend** with 8 specialized AI agents
- **Advanced Terminal Interface** matching sophisticated design reference
- **Real-time AI Chat** with specialized agents
- **Responsive Design** for all devices
- **Professional Deployment** ready for production

## 🤖 AI Agents

1. **FLOWI CEO** - Strategic objectives and leadership
2. **Hook Creator** - Viral content hooks and openings
3. **Thumbnail Wizard** - Eye-catching thumbnail creation
4. **Editor Pro** - Content editing and optimization
5. **Trend Researcher** - Social media trend analysis
6. **Optimizer** - Performance optimization
7. **Data Master** - Analytics and data management
8. **Growth Expert** - Content reach expansion

## 🛠 Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Lucide React for icons

### Backend
- Node.js with Express.js
- CORS and security middleware
- Environment-based configuration
- RESTful API design

## 📁 Project Structure

```
flowmatik/
├── flowmatik-frontend/          # React frontend
│   ├── src/
│   │   ├── components/          # UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── AITeam.tsx
│   │   │   ├── CommandCenter.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Footer.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env                     # Frontend environment variables
│   └── package.json
├── flowmatik-backend/           # Node.js backend
│   ├── server.js               # Main server file
│   ├── .env                    # Backend environment variables
│   ├── package.json
│   ├── Dockerfile              # Docker deployment
│   ├── vercel.json             # Vercel deployment
│   └── render.yaml             # Render deployment
└── README.md
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Backend Setup
```bash
cd flowmatik-backend
npm install
npm run dev
```
Server runs on http://localhost:8000

### Frontend Setup
```bash
cd flowmatik-frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## 🌐 Deployment Options

### Option 1: Cloudflare (Recommended)
- **Frontend**: Cloudflare Pages
- **Backend**: Cloudflare Workers
- **Domain**: flowmatik.co with admin.flowmatik.co

### Option 2: Vercel
```bash
cd flowmatik-backend
vercel deploy
```

### Option 3: Render
```bash
cd flowmatik-backend
# Upload render.yaml to Render dashboard
```

### Option 4: Docker
```bash
cd flowmatik-backend
docker build -t flowmatik-backend .
docker run -p 8000:8000 flowmatik-backend
```

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://api.flowmatik.co
VITE_APP_NAME=Flowmatik
VITE_APP_VERSION=1.0.0
```

### Backend (.env)
```
PORT=8000
NODE_ENV=production
CORS_ORIGIN=https://flowmatik.co
AI_API_KEY=your_ai_api_key_here
AI_API_URL=your_ai_api_url_here
```

## 🎨 Design Features

- **Cyberpunk/Neon Aesthetic** with gradient colors
- **Advanced Terminal Interface** with language selection
- **Project Status Panels** showing system health
- **API Status Indicators** for real-time monitoring
- **Responsive Layout** for all screen sizes
- **Interactive Elements** with hover effects

## 📱 Command Center Features

- **Language Selection**: English, Español, Português
- **Project Status**: System health monitoring
- **API Status**: Real-time connection status
- **AI Agent Selection**: 8 specialized agents
- **Quick Actions**: Deploy, backup, and monitoring
- **Real-time Chat**: Interactive AI conversations

## 🔗 API Endpoints

- `GET /api/health` - Health check
- `GET /api/agents` - Get all AI agents
- `POST /api/generate` - Generate AI content
- `GET /api/avatars/:agentId` - Get agent avatar

## 🚀 Current Status

✅ **Frontend Deployed**: https://flowmatikcontent-app-g8m230oz.devinapps.com
⏳ **Backend Deployment**: In progress
🎯 **Target Domain**: flowmatik.co / admin.flowmatik.co

## 📞 Support

For deployment assistance or custom domain configuration, contact the development team.

---

**Flowmatik** - Revolutionizing content creation with AI technology.
