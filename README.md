# My Fullstack React + Node.js + MongoDB Project

A simple fullstack project with React (Vite + TypeScript) frontend, Node.js + Express backend, and MongoDB database.

---

## Requirements

- Node.js v20+
- npm 9+ (or yarn/pnpm)
- MongoDB running locally or a cloud instance (e.g., MongoDB Atlas)

---

## Backend Setup

1. Go to the backend folder:

```bash
cd backend
```
2. Install dependencies:

```bash
npm install
```
3. Create a .env file:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mydatabase
```

4. Start the backend server:

```bash
npm run dev
```
Server will run at http://localhost:5000

---

## Frontend Setup

1. Go to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```bash
VITE_API_BASE=http://localhost:5000/api
```

4. Start the frontend:
```bash
npm run dev
```
Frontend will run at http://localhost:5173

---

## Build 
### Frontend:
```bash
npm run build
```
Production files will be in dist/

### Backend:

Simply run npm start after building, if needed.