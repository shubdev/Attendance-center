# D-Table Analytics (Attendance Management System)

A comprehensive, full-stack Attendance Management & Analytics System designed for modern workforce tracking. This monorepo contains both the frontend React application and the backend Node.js server.

## 🌟 Key Features

- **Premium UI/UX Design**: 
  - Completely revamped with a modern "Blue, White, and Black" aesthetic.
  - Glossy glassmorphism card containers, ambient glowing elements, and sleek dark blue gradients.
  - Seamless Light/Dark mode responsiveness across the entire application.
- **Role-Based Access Control**: Secure access tailored for Employees, Managers, and Admins.
- **Smart Punch Terminal**: 
  - Location-aware clock-in/out with Geolocation validation (Geofencing).
  - Webcam selfie capture verification during punch-in.
- **Overtime Management**: Employees can request overtime; Managers can review, approve, or reject.
- **Admin & Manager Consoles**: 
  - Manage user directories and team hierarchies.
  - Review and audit system-wide attendance logs.
  - Generate and export CSV reports.

## 🚀 Tech Stack

**Frontend** (`/DTA-Frontend`)
- React 19, Vite
- Tailwind CSS v4
- Redux Toolkit (State Management)
- React Router DOM
- React Webcam

**Backend** (`/DTA-Backend`)
- Node.js, Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) & bcrypt for Auth
- Zod (Schema Validation)
- Winston & Morgan (Logging)

---

## 📂 Project Structure

This project is a monorepo consisting of two main directories:

- `/DTA-Backend`: The Node.js/Express API server.
- `/DTA-Frontend`: The Vite/React user interface.

*(Each directory contains its own dedicated `README.md` for more in-depth, specific architectural details).*

---

## 🛠️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd DTA-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Create a `.env` file in the `DTA-Backend` folder:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/dtableanalytics
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   
   # Optional Geofencing configuration (in meters)
   GEOFENCING_LAT=12.9716
   GEOFENCING_LON=77.5946
   GEOFENCING_RADIUS=500
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd DTA-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Create a `.env` file in the `DTA-Frontend` folder:
   ```env
   VITE_BASE_URI=http://localhost:3000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

You should now be able to access the application in your browser (typically at `http://localhost:5173`).

---

## 📐 Architecture Highlights

### Backend Architecture
The backend follows a **layered, class-based architecture** combined with the **Repository Pattern**. It separates concerns across Routes, Controllers (handling HTTP requests), Services (business logic), and Repositories (database operations).

### Frontend Architecture
The frontend leverages a **4-Layer Architecture** combined with a **Feature-Based Folder Structure**. Each feature module encapsulates its own Presentation Layer (UI), Hooks/Logic Layer, State Management Layer (Redux Slices), and Data/API Layer.

---

## 💡 Assumptions & Requirements

- **Camera & Location**: The frontend requires the user's browser to allow Webcam and Geolocation permissions to punch in successfully.
- **Selfies**: Selfie images are sent to the backend and stored locally (in `src/uploads/attendance/`). 
- **Roles**: Initial users need to be assigned valid roles (`admin`, `manager`, `employee`) to experience customized workflows.
