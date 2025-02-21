# TaskAI - Smart Task Management System

TaskAI is a modern task management application that combines the power of AI with real-time collaboration features. Built with Next.js for the frontend and Go for the backend, it offers a robust and scalable solution for managing tasks efficiently.

![TaskAI Dashboard](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072)

## Features

### Frontend Features

1. **Authentication**
   - User registration with name, email, and password
   - Secure login system
   - JWT-based authentication
   - Protected routes

2. **Dashboard**
   - Overview of all tasks
   - Real-time task statistics
   - Task count by status
   - Beautiful UI with shadcn/ui components

3. **Task Management**
   - Create new tasks
   - Edit existing tasks
   - Delete tasks with confirmation
   - Real-time updates using WebSocket
   - Search and filter tasks
   - Sort by different criteria

4. **AI Integration**
   - AI-powered task suggestions
   - Smart task breakdown
   - Priority and due date recommendations
   - Step-by-step task completion guidance

5. **UI/UX**
   - Responsive design
   - Dark/Light theme support
   - Toast notifications
   - Loading states
   - Error handling
   - Smooth transitions

### Backend Features

1. **API Endpoints**
   - RESTful API design
   - JWT authentication middleware
   - CORS support
   - Rate limiting

2. **Database**
   - PostgreSQL integration
   - GORM for ORM
   - Auto migrations
   - Efficient queries

3. **Real-time Features**
   - WebSocket support
   - Real-time task updates
   - Live notifications

4. **AI Integration**
   - OpenAI API integration
   - Smart task analysis
   - Intelligent suggestions

## Tech Stack

### Frontend
- Next.js 13
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Socket.io Client
- Lucide Icons

### Backend
- Go
- Fiber
- GORM
- PostgreSQL
- WebSocket
- OpenAI API

## Getting Started

### Prerequisites
- Node.js 16+
- Go 1.21+
- PostgreSQL
- OpenAI API key

### Local Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd taskai
```

2. **Frontend Setup**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Backend Setup**
```bash
cd backend

# Install Go dependencies
go mod download

# Create .env file
cp .env.example .env

# Update environment variables in .env
# Add your database URL and OpenAI API key

# Start the server
go run .
```

4. **Database Setup**
```bash
# Create PostgreSQL database
createdb taskai

# Tables will be auto-migrated when starting the backend
```

5. **Environment Variables**

Frontend (.env):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Backend (.env):
```env
PORT=8080
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskai
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
```

### Running Tests
```bash
# Frontend tests
npm run test

# Backend tests
cd backend
go test ./...
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Task Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/suggestions` - Get AI suggestions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [OpenAI](https://openai.com/) for the AI integration
- [Unsplash](https://unsplash.com/) for the images