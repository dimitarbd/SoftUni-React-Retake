# Auto Parts Marketplace - Architecture Documentation

## Project Overview
A React-based marketplace for auto parts with user authentication, catalog management, and offer creation.

## Architecture

### Frontend (React)

#### Core Structure
```
Client/
├── src/
│   ├── api/          # API integration
│   ├── components/   # React components
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom hooks
│   └── utils/        # Utility functions
```

#### Key Components
1. **Authentication**
   - `AuthContext` - Manages user authentication state
   - `Login/Register` - User authentication forms
   - `authUtils` - Token management utilities

2. **Parts Management**
   - `PartCatalog` - Main catalog view
   - `PartDetails` - Detailed part view
   - `PartImport` - Part creation form
   - `PartEdit` - Part editing form

3. **User Interface**
   - `Header` - Navigation and user menu
   - `MyAccount` - User dashboard
   - `Footer` - Site footer

### Backend (Node.js)

#### Core Structure
```
Server/
├── server.js         # Main server entry
├── data/            # Data storage
└── services/        # Server services
```

#### Key Services
1. **Authentication Service**
   - User registration
   - Login/logout
   - JWT token management

2. **Data Service**
   - CRUD operations for parts
   - Data persistence
   - Query filtering

## Data Flow

1. **Authentication Flow**
   ```
   User Action → Auth API → JWT Token → Protected Routes
   ```

2. **Parts Management Flow**
   ```
   User Action → Parts API → Data Service → Storage
   ```

## API Structure

### Authentication Endpoints
- `POST /users/register`
- `POST /users/login`
- `GET /users/logout`

### Parts Endpoints
- `GET /data/parts`
- `GET /data/parts/:id`
- `POST /data/parts`
- `PUT /data/parts/:id`
- `DELETE /data/parts/:id`

## Security

1. **Authentication**
   - JWT-based authentication
   - Protected routes
   - Token validation

2. **Authorization**
   - Owner-only access
   - Role-based permissions

## State Management

1. **Authentication State**
   - JWT token storage
   - User context
   - Protected route handling

2. **Application State**
   - Parts data
   - User preferences
   - UI state

## Development Guidelines

1. **Code Organization**
   - Component-based architecture
   - Separation of concerns
   - Reusable hooks and utilities

2. **Best Practices**
   - Error handling
   - Loading states
   - Form validation
   - Responsive design 