
# Database Schema Visualizer

**Database Schema Visualizer** is a web-based application that allows users to dynamically connect to different relational database engines and **visualize their database schema**, including tables, columns, and relationships (foreign keys), in a clear and centralized way.

The project follows a **full-stack architecture**, with a **Node.js (Express) backend** and a **React frontend**, designed to simplify the analysis and understanding of relational database structures.

---

## Key Features

- Dynamic connection to multiple database engines:
  - PostgreSQL
  - MySQL
  - SQL Server
- Automatic retrieval of:
  - Tables
  - Columns
  - Data types
  - Default values
  - Table relationships (Foreign Keys)
- Clear separation of concerns:
  - Backend (REST API)
  - Frontend (Web UI)
- JSON-based HTTP communication
- CORS support for local development
- Concurrent execution of frontend and backend

---

## Project Architecture

```
Database-Schema-Visualizer-main/
│
├── BackEnd/              # Node.js (Express) REST API
│   └── index.js
│
├── FrontEnd/             # React application
│   └── proyectobdII/
│
├── package.json          # Main project scripts
├── package-lock.json
└── node_modules/
```

---

##  Technologies Used

### Backend
- Node.js
- Express
- PostgreSQL (`pg`)
- MySQL (`mysql2`)
- SQL Server (`mssql`)
- CORS

### Frontend
- React
- Vite
- Chakra UI
- Framer Motion
- TypeScript

### Tooling
- npm
- npm-run-all

---

## Prerequisites

Before running the project, ensure you have installed:

- Node.js (recommended version: 18 or higher)
- npm
- At least one of the following database engines:
  - PostgreSQL
  - MySQL
  - SQL Server

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/database-schema-visualizer.git
cd Database-Schema-Visualizer-main
```

2. Install dependencies:

```bash
npm install
```

---

## Running the Project

The project is configured to run **both frontend and backend simultaneously**.

```bash
npm start
```

This will start:
- Backend at: `http://localhost:5000`
- Frontend at: `http://localhost:5173` (or the port assigned by Vite)

---

## Main API Endpoints (Backend)

### Configure database connection

- **PostgreSQL**
  ```
  POST /api/set-connection-postgresql
  ```

- **MySQL**
  ```
  POST /api/set-connection-mysql
  ```

- **SQL Server**
  ```
  POST /api/set-connection-sqlserver
  ```

### Retrieve schema data

- **PostgreSQL**
  ```
  GET /api/postgresql-data
  ```

- **MySQL**
  ```
  GET /api/mysql-data?database=database_name
  ```

- **SQL Server**
  ```
  GET /api/sqlserver-data
  ```

---

## Schema Information Retrieved

For each supported database engine, the application retrieves:

- Table names
- Column names
- Data types
- Nullable constraints
- Default values
- Relationships between tables (foreign keys)

---

## Project Purpose

This project was developed for **academic and practical purposes**, aiming to:

- Improve understanding of relational database structures
- Simplify visualization of complex schemas
- Centralize schema analysis across multiple database engines
- Practice full-stack development with real database integrations

---

## Project Status

- Functional in development environments
- Not production-ready
- Database connections are handled in memory (non-persistent)

---

## License

This project is intended for educational use.  
You are free to modify and adapt it to your needs.
