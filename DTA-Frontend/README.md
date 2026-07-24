# D-Table Analytics - Frontend

A React-based Attendance Management & Analytics System built using Vite, Tailwind CSS, and Redux Toolkit.

---

## Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **NPM** (v9 or higher)

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `frontend` folder:
   ```env
   VITE_BASE_URI=http://localhost:3000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Architecture Overview

The codebase is organized using a **4-Layer Architecture** combined with a **Feature-Based Folder Structure** under the `src` directory.

### Directory Structure
- **`src/app/`**: Application-wide entry point, global styles, and context providers.
- **`src/features/`**: Contains modular business domains (Self-contained feature folders).
- **`src/routes/`**: Handles application routing, navigation guards, and layouts.
- **`src/store/`**: Configures Redux global state and API middleware integrations.

### The 4 Layers (Inside each Feature folder)
Inside each feature under `src/features/` (e.g., `auth`, `employee`, `managers`, `admin`), code is separated into four distinct layers:

1. **Presentation Layer (`components/` & `pages/`)**: Reusable UI blocks and full-page layout components.
2. **Hooks/Logic Layer (`hooks/`)**: Custom React hooks encapsulating UI state and business logic.
3. **State Management Layer (`*.slice.js`)**: Redux Toolkit slices tracking feature-specific global states.
4. **Data/API Layer (`api/`)**: API query/mutation declarations communicating with the backend.

---

## Features Implemented

- **Authentication & Authorization**: Role-based access control protecting views for Admins, Managers, and Employees.
- **Punch Terminal**: Location-aware clock-in/out containing:
  - Selfie capture using the client's webcam.
  - GPS geolocation validation during punch-in.
- **Overtime Management**: Employees can apply for overtime, while Managers can approve or reject requests.
- **Admin Management Console**:
  - User Directory management.
  - Attendance log audits across the system.
  - CSV report generation and exports.
- **Theme Toggler**: Full Light/Dark mode responsiveness.

---

## Assumptions Made

1. **Backend URL**: The backend server is running and accessible at `http://localhost:3000` (or as specified in `VITE_BASE_URI`).
2. **Client Hardware**: The user's device has a functional webcam and location services enabled.
3. **Geolocation & Camera Permissions**: The client browser supports HTML5 Geolocation and MediaDevices API, and the user will grant permission when requested.
4. **Predefined Roles**: The user account includes one of the predefined roles (`admin`, `manager`, or `employee`) returned by the authentication endpoint.
