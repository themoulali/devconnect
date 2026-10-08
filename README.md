# DevConnect

A full-stack developer networking platform that helps developers discover other developers, search by skills and location, view developer profiles, and build professional connections.

## Project Overview

DevConnect is a full-stack web application designed to help developers discover and connect with other developers.

Users can create an account, manage their profile, discover developers using search and filters, send connection requests, receive notifications, and manage their professional developer network.

The project was built to demonstrate full-stack development concepts including authentication, REST APIs, database integration, protected routes, frontend state management, and developer networking functionality.

## Features

* User registration and login
* JWT-based authentication
* Protected frontend routes
* Developer profile management
* Developer discovery
* Search developers by:

  * Name
  * Role
  * Skills
  * Location
* Filter developers by role
* Dynamic developer profile pages
* Send connection requests
* Prevent duplicate connection requests
* Accept connection requests
* Connection status:

  * Connect
  * Request Sent
  * Connected
* Notifications for connection requests
* Unread notification badge
* Mark notifications as read
* Public home page
* Responsive user navigation
* Logout functionality

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express
* TypeScript
* REST APIs
* JWT Authentication

### Database

* PostgreSQL
* Neon PostgreSQL
* Prisma ORM

### Development Tools

* Git
* GitHub
* Postman
* VS Code
* npm

## Application Architecture

```text
DevConnect
│
├── client
│   └── React + TypeScript + Vite
│
├── server
│   └── Express + TypeScript
│
└── PostgreSQL / Neon
```

The application follows a frontend-backend architecture:

```text
React Client
     │
     │ HTTP / REST API
     ▼
Express Server
     │
     │ Prisma ORM
     ▼
PostgreSQL / Neon
```

## Project Structure

```text
DevConnect/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Developers.tsx
│   │   │   ├── DeveloperProfile.tsx
│   │   │   └── Notifications.tsx
│   │   ├── routes/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── auth/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── connection.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── profile.service.ts
│   │   ├── notifications.routes.ts
│   │   ├── app.ts
│   │   └── db.ts
│   └── package.json
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/themoulali/devconnect.git
cd devconnect
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

## Environment Variables

Create the required environment configuration for the backend.

Example:

```env
DATABASE_URL="your_neon_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

Do not commit real database credentials, JWT secrets, or other sensitive environment variables to GitHub.

## Running the Application

### Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### Start the frontend

From the `client` directory:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

## Demo Accounts

The project includes test accounts for demonstrating the connection and notification functionality.

### Alex Johnson

```text
Email: alex.johnson@devconnect.test
Password: AlexDevConnect@123
```

### Sarah Williams

```text
Email: sarah.williams@devconnect.test
Password: SarahDevConnect@123
```

These accounts can be used to demonstrate the developer connection workflow and notifications.

## Connection Workflow

The connection workflow works as follows:

```text
Developer A
     │
     │ Send Connection Request
     ▼
Developer B
     │
     │ Notification Created
     ▼
Developer B Notifications
     │
     │ Accept Request
     ▼
Connection Status: ACCEPTED
```

Duplicate connection requests are prevented by checking for an existing connection in either direction.

## Notification Workflow

When a developer sends a connection request:

1. A connection record is created.
2. The receiver receives a notification.
3. The notification appears on the Notifications page.
4. The unread notification count appears in the navigation.
5. The receiver can mark the notification as read.

## API Overview

### Authentication

```text
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Connections

```text
POST /auth/connections
GET  /auth/connections/:userId
```

### Notifications

```text
GET   /notifications/:userId
GET   /notifications/:userId/unread
PATCH /notifications/:notificationId/read
GET   /notifications/:userId/requests
PATCH /notifications/:connectionId/accept
```

### Health Check

```text
GET /api/health
```

## Production Build Verification

The project has been verified with production builds.

### Frontend

```bash
npm run build
```

### Backend

```bash
npm run build
```

Both frontend and backend TypeScript/build checks pass successfully.

## Screenshots

Screenshots can be added here to demonstrate the application UI.

Recommended screenshots:

* Home page
* Login page
* Developer discovery page
* Developer profile
* Connection request
* Notifications page
* Unread notification badge

## Future Enhancements

Possible future improvements include:

* Real-time notifications using WebSockets
* Developer skill endorsements
* Project portfolio management
* Developer messaging
* Advanced recommendation system
* Profile image upload
* Pagination for developer discovery
* More advanced authentication and authorization
* Deployment with production hosting

## Learning Outcomes

This project demonstrates practical experience with:

* Full-stack application development
* React and TypeScript
* REST API development
* Express backend development
* JWT authentication
* Protected routes
* PostgreSQL database integration
* Prisma ORM
* CRUD operations
* Database relationships
* Search and filtering
* Connection management
* Notification systems
* Git and GitHub workflow

## Author

Moulali Shaik

Python Full Stack Developer

GitHub:
https://github.com/themoulali

DevConnect Repository:
https://github.com/themoulali/devconnect
